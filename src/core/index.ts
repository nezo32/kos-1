import { createDirectus, type QuerySort, type QueryFilter } from "@directus/sdk";
import {
  authentication,
  rest,
  readItems,
  readItem,
  realtime,
  aggregate,
  uploadFiles,
  createItem,
  graphql
} from "@directus/sdk";

import type { CustomDirectusTypes, Plans } from "@/types/directus";

export const db = createDirectus<CustomDirectusTypes>("https://accreditation.rguk.local")
  .with(authentication())
  .with(
    realtime({
      authMode: "handshake",
      reconnect: {
        delay: 1000,
        retries: 5
      },
      heartbeat: true
    })
  )
  .with(graphql())
  .with(rest());

await db.login("test@test.com", "test", {});

export const getOopFilesTypesCount = async () =>
  (
    await db.request(
      aggregate("oop_files_types", {
        aggregate: { count: "*" }
      })
    )
  )[0].count ?? 0;
export const getDisciplinesFilesTypesCount = async () =>
  (
    await db.request(
      aggregate("disciplines_files_types", {
        aggregate: { count: "*" }
      })
    )
  )[0].count ?? 0;

export const getDisciplinesFileTypes = async () =>
  await db.request(
    readItems("disciplines_files_types", {
      fields: ["title", "id"]
    })
  );

type SortTypes = QuerySort<CustomDirectusTypes, Plans>;
type FilterTypes = QueryFilter<CustomDirectusTypes, Plans>;

type SortTypeFunc = () => SortTypes;
type FilterTypeFunc = () => FilterTypes;

export type SortObject = { index: number; direction: "descending" | "ascending" };
export type FilterObject = { institution?: string; code?: string; form?: string };

export async function getMainView(page?: number, sort?: SortObject, filter?: FilterObject) {
  const sorting: SortTypeFunc = () => {
    let target: SortTypes = "-active_oop";

    if (sort?.direction == "ascending") {
      switch (sort?.index) {
        case 0:
          //@ts-ignore
          target = "oop.code";
          break;
        case 1:
          target = "title";
          break;
        case 2:
          //@ts-ignore
          target = "active_oop.name";
          break;
        case 3:
          target = "qualification";
          break;
        case 4:
          //@ts-ignore
          target = "edu_form.name";
          break;
      }
    } else {
      switch (sort?.index) {
        case 0:
          //@ts-ignore
          target = "-oop.code";
          break;
        case 1:
          target = "-title";
          break;
        case 2:
          //@ts-ignore
          target = "-active_oop.name";
          break;
        case 3:
          target = "-qualification";
          break;
        case 4:
          //@ts-ignore
          target = "-edu_form.name";
          break;
      }
    }
    return target;
  };
  const filtering: FilterTypeFunc = () => {
    let final: FilterTypes = {};

    if (filter?.code) {
      final = Object.assign({ oop: { code: { _contains: filter.code } } }, final);
    }
    if (filter?.form) {
      final = Object.assign({ edu_form: { name: { _contains: filter.form } } }, final);
    }
    if (filter?.institution) {
      final = Object.assign({ faculty: { name: { _contains: filter.institution } } }, final);
    }

    return final;
  };

  const plans = await db.request(
    readItems("plans", {
      fields: [
        // @ts-ignore
        "oop.code",
        "title",
        "qualification",
        // @ts-ignore
        "edu_form.name",
        // @ts-ignore
        "active_oop.name",
        "id",
        //@ts-ignore
        "oop.id"
      ],
      limit: 15,
      page: page || 1,
      filter: filter ? filtering() : undefined,
      sort: sort ? [sorting()] : undefined
    })
  );

  const count =
    (
      await db.request(
        aggregate("plans", {
          query: {
            limit: 15,
            filter: filter ? filtering() : undefined,
            sort: sort ? [sorting()] : undefined
          },
          aggregate: {
            count: "*"
          }
        })
      )
    )[0].count ?? 0;

  return { data: plans, count: Number(count) };
}

export async function getPlanById(id?: string) {
  if (!id) return;
  const data = await db.request(
    readItem("plans", id, {
      fields: [
        // @ts-ignore
        "oop.code",
        "title",
        "qualification",
        // @ts-ignore
        "edu_form.name",
        // @ts-ignore
        "active_oop.name",
        // @ts-ignore
        "id",
        // @ts-ignore

        "oop.id"
      ]
    })
  );

  return data;
}

export async function uploadFile(planId: string, file: File, type: string) {
  const form = new FormData();
  form.append(file.name, file);
  const uploadedFile = await db.request(uploadFiles(form));
  if (!uploadedFile) return;

  const plan = await db.request(
    readItem("plans", planId, {
      fields: [
        //@ts-ignore
        "oop.id"
      ]
    })
  );

  if (!plan?.oop?.id) return;

  await db.request(
    createItem("oop_files", {
      type: type as any,
      oop: plan.oop.id as any,
      file: uploadedFile.id as any
    })
  );
}

export async function uploadRpdFile(disciplineId: string, file: File, type: string) {
  const form = new FormData();
  form.append(file.name, file);
  const uploadedFile = await db.request(uploadFiles(form));
  if (!uploadedFile) return;

  await db.request(
    createItem("disciplines_files", {
      type: type as any,
      discipline: disciplineId as any,
      file: uploadedFile.id as any
    })
  );
}

export async function getMainFilter() {
  const forms = await db.request(
    readItems("edu_forms", {
      fields: ["name"],
      sort: ["name"]
    })
  );
  const institution = await db.request(
    readItems("faculties", {
      fields: ["name"],
      filter: {
        plans: {
          _nnull: true
        }
      },
      sort: ["name"]
    })
  );

  return { forms, institution };
}

export async function getEduProgramPractice(sort: "descending" | "ascending" | undefined, id?: string, page?: number) {
  if (!id) return;
  const practice = await db.request(
    readItems("disciplines", {
      fields: ["name", "id"],
      filter: {
        //@ts-ignore
        plan: id,
        //@ts-ignore
        object_type: {
          name: {
            _contains: "Практики"
          }
        },
        //@ts-ignore
        object_view: {
          name: {
            _eq: "Базовая"
          }
        }
      },
      limit: 15,
      sort: sort ? (sort == "ascending" ? ["name"] : ["-name"]) : undefined,
      page: page || 1
    })
  );

  const pCount =
    (
      await db.request(
        aggregate("disciplines", {
          aggregate: { count: "*" },
          query: {
            fields: ["name", "id"],
            filter: {
              //@ts-ignore
              plan: id,
              //@ts-ignore
              object_type: {
                name: {
                  _contains: "Практики"
                }
              },
              //@ts-ignore
              object_view: {
                name: {
                  _eq: "Базовая"
                }
              }
            },
            limit: 15,
            sort: sort ? (sort == "ascending" ? ["name"] : ["-name"]) : undefined,
            page: page || 1
          }
        })
      )
    )[0].count ?? 0;

  return {
    practice,
    pCount
  };
}
export async function getEduProgramDiscipline(
  sort: "descending" | "ascending" | undefined,
  id?: string,
  page?: number
) {
  if (!id) return;
  const disciplines = await db.request(
    readItems("disciplines", {
      fields: ["name", "id"],
      filter: {
        //@ts-ignore
        plan: id,
        //@ts-ignore
        object_type: {
          name: {
            _contains: "Дисциплины"
          }
        },
        //@ts-ignore
        object_view: {
          name: {
            _eq: "Базовая"
          }
        }
      },
      limit: 15,
      sort: sort ? (sort == "ascending" ? ["name"] : ["-name"]) : undefined,
      page: page || 1
    })
  );

  const dCount =
    (
      await db.request(
        aggregate("disciplines", {
          aggregate: { count: "*" },
          query: {
            fields: ["name", "id"],
            filter: {
              //@ts-ignore
              plan: id,
              //@ts-ignore
              object_type: {
                name: {
                  _contains: "Дисциплины"
                }
              },
              //@ts-ignore
              object_view: {
                name: {
                  _eq: "Базовая"
                }
              }
            },
            limit: 15,
            sort: sort ? (sort == "ascending" ? ["name"] : ["-name"]) : undefined,
            page: page || 1
          }
        })
      )
    )[0].count ?? 0;

  return {
    disciplines,
    dCount
  };
}

export async function getOOPDocumentsTypes() {
  const types = await db.request(
    readItems("oop_files_types", {
      limit: -1,
      fields: ["title", "id", "status"],
      sort: ["title"]
    })
  );
  return types;
}

export async function getOOPDocumentTitle(id: string) {
  const name = await db.request(readItem("oop_files_types", id, { fields: ["title"] }));
  return name?.title;
}

export async function getOOPDocumentUploadedById(oopId: string, documentTypeId: string) {
  const instance = await db.request(
    readItems("oop_files", {
      filter: {
        //@ts-ignore
        oop: oopId,
        //@ts-ignore
        type: documentTypeId
      }
    })
  );
  return instance[0];
}

export async function getOOPDocumentsUploaded(planId: string) {
  const instance = await db.request(
    readItems("oop_files", {
      filter: {
        oop: {
          //@ts-ignore
          plans: planId
        }
      }
    })
  );
  return instance || [];
}

export async function getURL(planId: string, documentTypeId: string) {
  const a = await db.request(
    readItems("oop_files", {
      filter: {
        oop: {
          //@ts-ignore
          plans: planId
        },
        //@ts-ignore
        type: documentTypeId
      }
    })
  );
  if (a.length == 0 || !a[0].file) return undefined;
  return `https://accreditation.rguk.local/assets/${a[0].file}?access_token=${await db.getToken()}`;
}
