import type { Plans } from "@/types/directus";
import { readItems, aggregate } from "@directus/sdk";
import type { KTableTypes } from "@kosygin-rsu/components";
import { db, getDisciplinesFilesTypesCount, getOopFilesTypesCount } from ".";

//@ts-ignore
export const pagination: KTableTypes.TablePaginationFunc<Plans, Record<string, string>> = async (
  page,
  maxElements,
  search,
  order
) => {
  const symbol = order?.direciton == "desc" ? "-" : "";
  const sort = order?.field;
  const req = await db.request(
    readItems("plans", {
      //@ts-ignore
      fields: ["active_oop.name", "oop.name", "oop.code", "edu_form.name", "id", "qualification", "oop.id"],
      limit: maxElements,
      page,
      //@ts-ignore
      sort: sort ? symbol + sort : undefined,
      search
    })
  );

  const reqCount =
    (
      await db.request(
        aggregate("plans", {
          aggregate: { count: "*" },
          query: {
            fields: ["active_oop.name", "oop.name", "oop.code", "edu_form.name", "id", "qualification", "oop.id"],
            limit: maxElements,
            //@ts-ignore
            sort: sort ? symbol + sort : undefined,
            search
          }
        })
      )
    )[0]?.count ?? 0;
  const res = {
    elements: req ?? [],
    pages: Math.ceil(Number(reqCount) / maxElements)
  };
  if (res.elements.length) {
    res.elements = res.elements.map((el) => {
      return Object.assign(el, { faculty: null });
    });
  }

  return res;
};

export const columnMapper: KTableTypes.TableColumnMapper<Plans> | undefined = (el, col) => {
  if (col.field != "faculty") return col.mapped;
  return new Promise(async (resolve, reject) => {
    const oopFiles = await db.request(
      readItems("oop_files", {
        fields: ["id"],
        filter: {
          //@ts-ignore
          oop: el.oop!.id
        },
        limit: -1
      })
    );
    const practice = await db.request(
      readItems("disciplines", {
        fields: ["id"],
        filter: {
          //@ts-ignore
          plan: el.id,
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
        limit: -1
      })
    );
    const disciplines = await db.request(
      readItems("disciplines", {
        fields: ["id"],
        filter: {
          //@ts-ignore
          plan: el.id,
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
        limit: -1
      })
    );

    let disciplinesFiles: string[] = [];
    if (practice && practice?.length) {
      const temp = await db.request(
        readItems("disciplines_files", {
          fields: ["id"],
          filter: {
            //@ts-ignore
            discipline: {
              id: {
                _in: practice.map((el) => el.id)
              }
            }
          },
          limit: -1
        })
      );
      temp?.forEach((el) => {
        disciplinesFiles.push(el.id);
      });
    }
    if (disciplines && disciplines?.length) {
      const temp = await db.request(
        readItems("disciplines_files", {
          fields: ["id"],
          filter: {
            //@ts-ignore
            discipline: {
              id: {
                _in: disciplines.map((el) => el.id)
              }
            }
          },
          limit: -1
        })
      );
      temp?.forEach((el) => {
        disciplinesFiles.push(el.id);
      });
    }

    const disciplinesCount = (practice?.length || 0) + (disciplines?.length || 0);

    const oopFilesCount = oopFiles?.length || 0;
    const disciplinesFilesCount = disciplinesFiles.length;

    const expectedDisciplinesFilesCount = disciplinesCount * Number(await getDisciplinesFilesTypesCount());
    const expectedOopFilesCount = await getOopFilesTypesCount();

    const result =
      ((oopFilesCount + disciplinesFilesCount) * 100) /
      (Number(expectedDisciplinesFilesCount) + Number(expectedOopFilesCount));

    resolve(`${result.toFixed(1)}%`);
  });
};

export const getFilledPercents = async (id: string, oopId: string) => {
  const oopFiles = await db.request(
    readItems("oop_files", {
      fields: ["id"],
      filter: {
        //@ts-ignore
        oop: oopId
      },
      limit: -1
    })
  );
  const practice = await db.request(
    readItems("disciplines", {
      fields: ["id"],
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
      limit: -1
    })
  );
  const disciplines = await db.request(
    readItems("disciplines", {
      fields: ["id"],
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
      limit: -1
    })
  );

  let disciplinesFiles: string[] = [];
  if (practice && practice?.length) {
    const temp = await db.request(
      readItems("disciplines_files", {
        fields: ["id"],
        filter: {
          //@ts-ignore
          discipline: {
            id: {
              _in: practice.map((el) => el.id)
            }
          }
        },
        limit: -1
      })
    );
    temp?.forEach((el) => {
      disciplinesFiles.push(el.id);
    });
  }
  if (disciplines && disciplines?.length) {
    const temp = await db.request(
      readItems("disciplines_files", {
        fields: ["id"],
        filter: {
          //@ts-ignore
          discipline: {
            id: {
              _in: disciplines.map((el) => el.id)
            }
          }
        },
        limit: -1
      })
    );
    temp?.forEach((el) => {
      disciplinesFiles.push(el.id);
    });
  }

  const disciplinesCount = (practice?.length || 0) + (disciplines?.length || 0);

  const oopFilesCount = oopFiles?.length || 0;
  const disciplinesFilesCount = disciplinesFiles.length;

  const expectedDisciplinesFilesCount = disciplinesCount * Number(await getDisciplinesFilesTypesCount());
  const expectedOopFilesCount = await getOopFilesTypesCount();

  const result =
    ((oopFilesCount + disciplinesFilesCount) * 100) /
    (Number(expectedDisciplinesFilesCount) + Number(expectedOopFilesCount));

  return `${result.toFixed(1)}%`;
};
