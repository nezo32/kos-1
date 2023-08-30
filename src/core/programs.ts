import type { KTableTypes } from "@kosygin-rsu/components";
import { db } from ".";
import type { DisciplinesFiles } from "@/types/directus";
import { readItems, aggregate } from "@directus/sdk";

export const paginationPractice = async (
  id: string,
  page: number,
  maxElements: number,
  search?: string,
  order?: KTableTypes.TablePaginationOrderObject<Record<string | number | symbol, string | null | undefined>>
) => {
  const symbol = order?.direciton == "desc" ? "-" : "";
  const sort = order?.field;

  const req = await db.request(
    readItems("disciplines", {
      //@ts-ignore
      fields: ["name", "id", "disciplines_files.type.title"],
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
        aggregate("disciplines", {
          aggregate: { count: "*" },
          query: {
            //@ts-ignore
            fields: ["name", "id", "disciplines_files.type.title"],
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
            limit: maxElements,
            page,
            //@ts-ignore
            sort: sort ? symbol + sort : undefined,
            search
          }
        })
      )
    )[0].count ?? 0;
  const res = {
    elements: req,
    pages: Math.ceil(reqCount / maxElements)
  };
  if (res.elements.length) {
    res.elements = res.elements.map((el) => {
      const fos = el.disciplines_files?.find((el) => el.type?.title == "ФОС");
      const annotation = el.disciplines_files?.find((el) => el.type?.title == "Аннотация");
      const program = el.disciplines_files?.find((el) => el.type?.title == "Программа");

      return Object.assign(el, {
        fos: fos ? "В разработке" : "Отсутствует",
        annotation: annotation ? "В разработке" : "Отсутствует",
        program: program ? "В разработке" : "Отсутствует"
      });
    });
  }
  return res;
};
export const paginationDiscipline = async (
  id: string,
  page: number,
  maxElements: number,
  search?: string,
  order?: KTableTypes.TablePaginationOrderObject<Record<string | number | symbol, string | null | undefined>>
) => {
  const symbol = order?.direciton == "desc" ? "-" : "";
  const sort = order?.field;
  const req = await db.request(
    readItems("disciplines", {
      //@ts-ignore
      fields: ["name", "id", "disciplines_files.type.title"],
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
        aggregate("disciplines", {
          aggregate: { count: "*" },
          query: {
            //@ts-ignore
            fields: ["name", "id", "disciplines_files.type.title"],
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
            limit: maxElements,
            page,
            //@ts-ignore
            sort: sort ? symbol + sort : undefined,
            search
          }
        })
      )
    )[0].count ?? 0;

  const res = {
    elements: req,
    pages: Math.ceil(reqCount / maxElements)
  };
  if (res.elements.length) {
    res.elements = res.elements.map((el) => {
      const fos = el.disciplines_files?.find((el) => el.type?.title == "ФОС");
      const annotation = el.disciplines_files?.find((el) => el.type?.title == "Аннотация");
      const program = el.disciplines_files?.find((el) => el.type?.title == "Программа");
      return Object.assign(el, {
        fos: fos ? "В разработке" : "Отсутствует",
        annotation: annotation ? "В разработке" : "Отсутствует",
        program: program ? "В разработке" : "Отсутствует"
      });
    });
  }

  return res;
};
