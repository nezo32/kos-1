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
import { readItems, createItem, updateItem, readItem } from "@directus/sdk";
import { useRoute } from "vue-router";
import { cancelable, type CancelablePromise } from "cancelable-promise";
import { type DocumentsParts } from "@/types/directus";
import { createClient } from "graphql-ws";
import { useUserStore } from "@/stores";

type Field = { key: string; value: string };

const page = ref(1);

const route = useRoute();
const store = useUserStore();

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

const displayData = ref<DocumentsParts[]>();

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
    await db.request(
      createItem("oop_files", {
        oop: oop[0].oop,
        //@ts-ignore
        type: docId
      })
    );
  }

  currentFile.value = (
    await db.request(
      readItems("oop_files", {
        fields: ["id"],
        filter: {
          //@ts-ignore
          type: docId,
          oop: oop[0].oop
        }
      })
    )
  )[0].id;
}
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

const promise = ref<CancelablePromise<any>>();
async function setField(data: Field, init: boolean, changeFullValue?: boolean) {
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
    if (changeFullValue) {
      await db.request(
        createItem("documents_parts", {
          //@ts-ignore
          oop_file: currentFile.value,
          key: data.key,
          value: data.value
        })
      );
      return;
    }
    await db.request(
      createItem("documents_parts", {
        //@ts-ignore
        oop_file: currentFile.value,
        key: data.key,
        value: { value: data.value }
      })
    );
  } else {
    if (changeFullValue) {
      await db.request(
        updateItem("documents_parts", res[0].id, {
          value: data.value
        })
      );
      return;
    }
    await db.request(
      updateItem("documents_parts", res[0].id, {
        value: { value: data.value }
      })
    );
  }
}

const client = createClient({
  url: "wss://accreditation.rguk.local/graphql",
  connectionParams: async () => {
    return { access_token: await db.getToken() };
  }
});

/* const removeHandlers = ref<(() => void)[]>([]);
const unsub = ref<() => void>(); */

/* async function wsConnect() {
  const { subscription, unsubscribe } = await db.subscribe("documents_parts", {
    query: {
      filter: {
        //@ts-ignore
        oop_file: currentFile.value
      }
    }
  });
  for await (const item of subscription) {
    //@ts-ignore
    const ev = item as MessageEventType;
    console.log("generator", ev);
    if (ev.event == "update" || ev.event == "create") {
      //@ts-ignore
      displayData.value = ev.data;
    }
  }
  unsub.value = unsubscribe;
}
function wsDisconnect() {
  unsub.value?.();

  removeHandlers.value.forEach((el) => el());
  removeHandlers.value = [];
}
function wsHandlers() {
  removeHandlers.value = [];

  removeHandlers.value.push(db.onWebSocket("open", openHandler));
  removeHandlers.value.push(db.onWebSocket("message", messageHandler));
  removeHandlers.value.push(db.onWebSocket("error", errorHandler));
  removeHandlers.value.push(db.onWebSocket("close", closeHandler));
} */

/* type MessageEventType = {
  data: Record<string, any>[];
  type: string;
  event: string;
};

function openHandler(ev: Event) {
  console.log("open", ev);
}

function messageHandler(ev: MessageEventType) {
  console.log("message", ev);
}
function errorHandler(ev: Event) {
  console.log("error", ev);
}
function closeHandler(ev: Event) {
  console.log("close", ev);
} */

function subscribeGraphQL() {
  client.on("opened", () => {
    console.log("ws opened");
  });
  client.on("connected", () => {
    console.log("ws connected");
  });
  client.on("connecting", () => {
    console.log("ws connecting");
  });
  client.on("closed", (s) => {
    console.log("ws closed");
  });

  client.subscribe<{ documents_parts_mutated: Record<string, any> }>(
    {
      query: `
				subscription {
					documents_parts_mutated {
						key
						event
						data {
							key
              value
              oop_file {
                id
              }
						}
					}
				}`
    },
    {
      next: ({ data }) => {
        if (!data || !("documents_parts_mutated" in data)) return;
        const docParts = data.documents_parts_mutated;
        if (docParts.event == "update" || docParts.event == "create") {
          const docPartsData = Object.assign({}, docParts.data);
          console.log(docPartsData);
          if (docPartsData.oop_file && "id" in docPartsData.oop_file && docPartsData.oop_file.id == currentFile.value) {
            delete docPartsData.oop_file;
            displayData.value = docPartsData;
          }
        }
      },
      error: (err) => {
        console.log(err);
        client.dispose();
      },
      complete: () => {}
    }
  );
}

const pingId = ref<number>();

async function pingOrBlock() {
  if (!currentFile.value) return;

  const now = new Date();
  const id = store.meId;

  if (!id) return;

  const fileInfo = await db.request(
    readItem("oop_files", currentFile.value, {
      //@ts-ignore
      fields: ["date_updated", "user_updated.id", "user_updated.last_name", "user_updated.first_name"]
    })
  );

  if ((fileInfo.user_updated?.id as string | undefined) != id) {
    if (fileInfo.date_updated) {
      if (Math.abs(new Date(fileInfo.date_updated).getTime() - now.getTime()) < 5000) {
        booked.value = true;
        worker.value = fileInfo.user_updated?.last_name + " " + fileInfo.user_updated?.first_name;
      } else {
        booked.value = false;
        worker.value = undefined;
        await db.request(updateItem("oop_files", currentFile.value!, {}));
      }
    } else {
      worker.value = undefined;
      booked.value = false;
      await db.request(updateItem("oop_files", currentFile.value!, {}));
    }
  } else {
    worker.value = undefined;
    booked.value = false;
    await db.request(updateItem("oop_files", currentFile.value!, {}));
  }
}

async function pingIntervalWrapper() {
  await pingOrBlock();
  return setInterval(async () => {
    await pingOrBlock();
  }, 1000);
}

onMounted(async () => {
  await load();
  await getInitValues();

  if (!currentFile.value) return;

  subscribeGraphQL();

  pingId.value = await pingIntervalWrapper();
});

onUnmounted(async () => {
  client.dispose();
  clearInterval(pingId.value);
});

const booked = ref(false);
const worker = ref<string>();
</script>

<template>
  <div class="description-oop">
    <DocumentEditBase
      v-model:currentPage="page"
      title="ОПОП"
      :header="headers[page - 1]"
      :pages="8"
      :booked="booked"
      :worker="worker"
    >
      <DescMain v-if="page == 1" @changeField="setField" :data="displayData" :booked="booked" />
      <O1 v-if="page == 2" @changeField="setField" :booked="booked" />
      <O2 v-if="page == 3" @changeField="setField" :booked="booked" />
      <O3 v-if="page == 4" @changeField="setField" :booked="booked" />
      <O4 v-if="page == 5" @changeField="setField" :booked="booked" />
      <O7First v-if="page == 6" @changeField="setField" :booked="booked" />
      <O7Second v-if="page == 7" @changeField="setField" :booked="booked" />
      <Resurses v-if="page == 8" @changeField="setField" :booked="booked" />
    </DocumentEditBase>
  </div>
</template>

<style scoped lang="scss"></style>
