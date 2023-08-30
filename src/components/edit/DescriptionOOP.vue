<script setup lang="ts">
import { db } from "@/core";
import { reactive, ref, onMounted, watch, onBeforeUnmount } from "vue";
import DocumentEditBase from "./DocumentEditBase.vue";
import DescMain from "./description/DescMain.vue";
import O1 from "./description/O1.vue";
import O2 from "./description/O2.vue";
import O3 from "./description/O3.vue";
import O4 from "./description/O4.vue";
import O7First from "./description/O7First.vue";
import O7Second from "./description/O7Second.vue";
import Resurses from "./description/Resurses.vue";
import { readItem, readItems, createItem } from "@directus/sdk";
import { useRoute } from "vue-router";
import type { Plans } from "@/types/directus";

const page = ref(1);

const route = useRoute();

const headers = reactive([
  "Основная профессиональная образовательная программа Высшего образования",
  "О1.	Общая характеристика образовательной программы",
  "О2. Характеристика профессиональной деятельности выпускника",
  "О3. Планируемые результаты освоения образовательной программы",
  "О4.	Структура и содержание образовательной программы",
  "О7.	Ресурсное обеспечение образовательной программы",
  "О7.	Ресурсное обеспечение образовательной программы",
  "Электронные ресурсы университета"
]);

const currentFile = ref<string>();

async function load() {
  const id = route.params.id as string;
  const docId = route.params.documentId as string;

  const oop = await db.request(
    readItems("plans", {
      fields: ["oop"],
      filter: {
        id: {
          _eq: id
        }
      }
    })
  );

  if (!oop[0].oop) return;

  const oopFiles = (
    await db.request(
      readItems("oop", {
        fields: ["oop_files"],
        filter: {
          id: {
            _eq: oop[0].oop
          }
        }
      })
    )
  )[0].oop_files as string[];

  let exist = false;

  if (oopFiles.length) {
    const oopFilesType = await db.request(
      readItems("oop_files", {
        fields: ["type"],
        filter: {
          id: {
            _in: oopFiles
          },
          type: {
            //@ts-ignore
            _eq: docId
          }
        }
      })
    );
    if (oopFilesType.length) {
      exist = true;
    }
  }

  if (!exist) {
    const res = await db.request(
      createItem("oop_files", {
        oop: oop[0].oop,
        //@ts-ignore
        type: docId
      })
    );
    console.log(res);
  }

  currentFile.value = (
    await db.request(
      readItems("oop_files", {
        fields: ["id"],
        filter: {
          //@ts-ignore
          type: docId
        }
      })
    )
  )[0].id;
}

const removeHandlers = ref<(() => void)[]>([]);

async function websocket() {
  removeHandlers.value = [];
  removeHandlers.value.push(db.onWebSocket("open", handler));
  removeHandlers.value.push(db.onWebSocket("message", handler));
  await db.connect();
  await db.subscribe("documents_parts", {
    event: "create",
    uid: currentFile.value,
    query: {
      filter: {
        oop_file: {
          //@ts-ignore
          _eq: currentFile.value
        }
      }
    }
  });
}
function handler(ev: Event) {
  console.log(ev);
}

watch(route, async (n) => {
  await websocket();
  await load();
});

onMounted(async () => {
  await websocket();
  await load();
});

onBeforeUnmount(async () => {
  removeHandlers.value.forEach((el) => el());
  removeHandlers.value = [];
  db.disconnect();
});
</script>

<template>
  <div class="description-oop">
    <DocumentEditBase v-model:currentPage="page" title="ОПОП" :header="headers[page - 1]" :pages="8" dropdown>
      <DescMain v-if="page == 1" />
      <O1 v-if="page == 2" />
      <O2 v-if="page == 3" />
      <O3 v-if="page == 4" />
      <O4 v-if="page == 5" />
      <O7First v-if="page == 6" />
      <O7Second v-if="page == 7" />
      <Resurses v-if="page == 8" />
    </DocumentEditBase>
  </div>
</template>

<style scoped lang="scss"></style>
