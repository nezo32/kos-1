<script setup lang="ts">
import { db } from "@/core";
import { reactive, ref, onMounted, onUnmounted } from "vue";
import DocumentEditBase from "./DocumentEditBase.vue";
import DescMain from "./description/DescMain.vue";
import O1 from "./description/O1.vue";
import O2 from "./description/O2.vue";
import O3 from "./description/O3.vue";
import O4 from "./description/O4.vue";
import O7First from "./description/O7First.vue";
import O7Second from "./description/O7Second.vue";
import Resurses from "./description/Resurses.vue";
import { readItems, createItem, updateItem } from "@directus/sdk";
import { useRoute } from "vue-router";
import { cancelable, type CancelablePromise } from "cancelable-promise";
import { type DocumentsParts } from "@/types/directus";

type Field = { key: string; value: string };

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
const unsubscribe = ref<(() => void)[]>([]);

async function wsConnect() {
  await db.connect();
  await db.subscribe("documents_parts", {
    query: {
      filter: {
        //@ts-ignore
        oop_file: currentFile.value
      }
    }
  });
}
function wsDisconnect() {
  unsubscribe.value.forEach((el) => el());
  unsubscribe.value = [];
  removeHandlers.value.forEach((el) => el());
  removeHandlers.value = [];
  db.disconnect();
}
function wsHandlers() {
  removeHandlers.value = [];

  removeHandlers.value.push(db.onWebSocket("open", openHandler));
  removeHandlers.value.push(db.onWebSocket("message", messageHandler));
  removeHandlers.value.push(db.onWebSocket("error", errorHandler));
  removeHandlers.value.push(db.onWebSocket("close", closeHandler));
}

type MessageEventType = {
  data: Record<string, any>[];
  type: string;
  event: string;
};

function openHandler(ev: Event) {
  console.log("open", ev);
}
function messageHandler(ev: MessageEventType) {
  console.log("message", ev);
  if (ev.event == "update" || ev.event == "create") {
    //@ts-ignore
    displayData.value = ev.data;
  }
}
function errorHandler(ev: Event) {
  console.log("error", ev);
}
function closeHandler(ev: Event) {
  console.log("close", ev);
}

const promise = ref<CancelablePromise<any>>();
async function setField(data: Field, init: boolean) {
  if (init) return;
  if (promise.value) {
    promise.value.cancel();
    promise.value = undefined;
  }
  promise.value = cancelable(
    db.request(
      readItems("documents_parts", {
        fields: ["id"],
        filter: {
          key: {
            _eq: data.key
          },
          oop_file: {
            //@ts-ignore
            _eq: currentFile.value
          }
        }
      })
    )
  );

  const res = await promise.value;

  if (!res.length) {
    /* db.sendMessage({
      type: "subscription",
      collection: "documents_parts",
      action: "create",
      data: {
        oop_file: currentFile.value,
        key: data.key,
        value: { value: data.value }
      }
    }); */
    await db.request(
      createItem("documents_parts", {
        //@ts-ignore
        oop_file: currentFile.value,
        key: data.key,
        value: { value: data.value }
      })
    );
  } else {
    /* db.sendMessage({
      type: "subscription",
      collection: "documents_parts",
      action: "update",
      data: {
        id: res[0].id,
        oop_file: currentFile.value,
        key: data.key,
        value: { value: data.value }
      }
    }); */
    await db.request(
      updateItem("documents_parts", res[0].id, {
        value: { value: data.value }
      })
    );
  }
}

const displayData = ref<DocumentsParts[]>();

async function getInitValues() {
  const data = await db.request(
    readItems("documents_parts", {
      filter: {
        //@ts-ignore
        oop_file: currentFile.value
      }
    })
  );
  //@ts-ignore
  displayData.value = data;
}

onMounted(async () => {
  wsHandlers();

  await getInitValues();

  await load();
  await wsConnect();
});

onUnmounted(() => {
  wsDisconnect();
});
</script>

<template>
  <div class="description-oop">
    <DocumentEditBase v-model:currentPage="page" title="ОПОП" :header="headers[page - 1]" :pages="8" dropdown>
      <DescMain v-if="page == 1" @changeField="setField" :data="displayData" />
      <O1 v-if="page == 2" @changeField="setField" />
      <O2 v-if="page == 3" @changeField="setField" />
      <O3 v-if="page == 4" @changeField="setField" />
      <O4 v-if="page == 5" @changeField="setField" />
      <O7First v-if="page == 6" @changeField="setField" />
      <O7Second v-if="page == 7" @changeField="setField" />
      <Resurses v-if="page == 8" @changeField="setField" />
    </DocumentEditBase>
  </div>
</template>

<style scoped lang="scss"></style>
