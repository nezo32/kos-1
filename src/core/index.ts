import { Directus } from "@directus/sdk";
import type { CustomDirectusTypes } from "@/types/directus";

const db = new Directus<CustomDirectusTypes>("/api")

await db.auth.login({
    email: 'l.nik801.l@gmail.com',
    password: 'admin'
})

export async function getMainView(page?: number) {
    const plans = await db.items('plans').readByQuery({

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
        meta: "total_count"
    })

    return { data: plans.data, count: plans.meta?.total_count ?? 0 }
}