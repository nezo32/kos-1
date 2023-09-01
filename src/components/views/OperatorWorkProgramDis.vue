<script setup lang="ts">
import { KSwitchButton } from "@kosygin-rsu/components";
import { onMounted, ref, watch } from "vue";
import Document from "@/components/Document.vue";
import DepLeadHomeCard from "@/components/DepLeadHomeCard.vue";
import EmployeeCard from "@/components/EmployeeCard.vue";
import { getPlanById, getDisciplinesFileTypes, db } from "@/core";
import { stringFirstToUpper } from "@/utils";
import { useRoute } from "vue-router";
import { readItems } from "@directus/sdk";

const route = useRoute();

const id = route.params.id;
const disciplineId = route.params.rpdId;
const title = route.meta.breadcrumbs as string;
const data = ref(await getPlanById(typeof id == "string" ? id : undefined));

const documentSelector = ref([true, false, false]);
const currentFileTypeId = ref("");

const url = ref<string>();

async function changeDocument(ind: number) {
  documentSelector.value = [false, false, false];
  documentSelector.value[ind] = true;
  if (ind == 0)
    currentFileTypeId.value = (await getDisciplinesFileTypes()).find((el) => el.title == "Программа")?.id ?? "";
  if (ind == 1)
    currentFileTypeId.value = (await getDisciplinesFileTypes()).find((el) => el.title == "Аннотация")?.id ?? "";
  if (ind == 2) currentFileTypeId.value = (await getDisciplinesFileTypes()).find((el) => el.title == "ФОС")?.id ?? "";
}

async function getURL(id: string | undefined) {
  return id ? `https://accreditation.rguk.local/assets/${id}?access_token=${await db.getToken()}` : undefined;
}

async function reload() {
  const id =
    (
      await db.request(
        readItems("disciplines_files", {
          fields: ["file"],
          filter: {
            //@ts-ignore
            type: currentFileTypeId.value,
            //@ts-ignore
            discipline: disciplineId
          }
        })
      )
    )?.map((el) => el.file)[0] ?? undefined;
  //@ts-ignore
  url.value = await getURL(id as string);
}

watch(currentFileTypeId, async () => {
  await reload();
});

onMounted(async () => {
  currentFileTypeId.value = (await getDisciplinesFileTypes()).find((el) => el.title == "Программа")?.id ?? "";
  await reload();
});
</script>

<template>
  <div class="work-program">
    <DepLeadHomeCard
      :id="data!.id"
      :oopid="data!.oop!.id"
      :code="data?.oop?.code || 'ㅤ'"
      :name="data?.title ? data?.title.slice(data?.title.indexOf(' ') + 1) : ''"
      :direction="data?.active_oop?.name || 'ㅤ'"
      :form="
        data?.edu_form?.name
          ? data.edu_form.name.includes(' форма')
            ? data.edu_form.name.slice(0, data.edu_form.name.indexOf(' форма'))
            : data.edu_form.name
          : ''
      "
      :graduate="stringFirstToUpper(data?.qualification || 'ㅤ')"
      year="2023 год"
      filled="100%"
    />
    <div class="work-program__inner">
      <EmployeeCard />
      <EmployeeCard />
    </div>
    <div class="work-program__selector">
      <KSwitchButton content="Рабочая программа дисциплины" v-model="documentSelector[0]" @click="changeDocument(0)" />
      <KSwitchButton
        content="Аннотация рабочей программы дисциплины"
        v-model="documentSelector[1]"
        @click="changeDocument(1)"
      />
      <KSwitchButton
        content="Оценочные средства по дисциплине"
        v-model="documentSelector[2]"
        @click="changeDocument(2)"
      />
    </div>
    <Document status="Ожидает проверки" :pdf="url" />
  </div>
</template>

<style lang="scss">
.work-program {
  display: flex;
  flex-direction: column;
  gap: 20px;
  &__inner {
    display: flex;
    flex-direction: row;
    gap: 20px;

    > * {
      width: calc((100% - 20px) / 2);
    }
  }
  &__selector {
    display: flex;
    flex-direction: row;
    gap: 20px;

    > .switch__button {
      width: 100%;
      > * {
        width: 100%;
        padding: 12px 10px !important;
      }
    }

    border-radius: 20px;
    background: var(--white);
    padding: 10px 20px;
  }
}
</style>
