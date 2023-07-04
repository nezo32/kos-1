import { Directus } from "@directus/sdk";
import type { CustomDirectusTypes } from "@/types/directus";

const db = new Directus<CustomDirectusTypes>("/api")

await db.auth.login({
    email: 'l.nik801.l@gmail.com',
    password: 'admin'
})

export async function getMainView() {
    db
    const zalupa = db.items('plans').readByQuery({

        fields: [
            "oop.code"
        ],
        //sort: ['year_start'],
        limit: -1
    })
    return zalupa
}