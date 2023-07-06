import { Directus, type Sort } from "@directus/sdk";
import type { CustomDirectusTypes, Plans } from "@/types/directus";

const db = new Directus<CustomDirectusTypes>("/api");

await db.auth.login({
  email: "l.nik801.l@gmail.com",
  password: "admin"
});

type SortTypes = Sort<Plans>[0];
type MainViewSortType = () => SortTypes;

export async function getMainView(page?: number, sort?: { index: number; direction: "descending" | "ascending" }) {
  const sorting: MainViewSortType = () => {
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

  const plans = await db.items("plans").readByQuery({
    fields: [
      // @ts-ignore
      "oop.code",
      "title",
      "qualification",
      // @ts-ignore
      "edu_form.name",
      // @ts-ignore
      "active_oop.name",
      "id"
    ],
    limit: 15,
    page: page || 1,
    meta: "total_count",
    sort: sort ? [sorting()] : undefined
  });

  return { data: plans.data, count: plans.meta?.total_count ?? 0 };
}

export async function getPlanById(id?: string) {
  if (!id) return;
  const data = await db.items("plans").readOne(id, {
    fields: [
      // @ts-ignore
      "oop.code",
      "title",
      "qualification",
      // @ts-ignore
      "edu_form.name",
      // @ts-ignore
      "active_oop.name",
      "id"
    ]
  });

  return data;
}

export async function uploadFile(title: string, to: string, file: File) {
  const form = new FormData();
  form.append(file.name, file);
  const uploadedFile = await db.files.createOne(form);
  if (!uploadedFile) return;

  const id = (
    await db.items("oop_files_types").createOne({
      title: title
    })
  )?.id;

  if (!id) return;

  const oop = await db.items("plans").readOne(to, {
    fields: [
      //@ts-ignore
      "oop.id"
    ]
  });

  if (!oop?.oop?.id) return;

  await db.items("oop_files").createOne({
    type: id as any,
    oop: oop.oop.id as any,
    file: uploadedFile.id as any
  });
}
