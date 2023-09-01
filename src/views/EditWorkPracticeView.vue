<script setup lang="ts">
import DepLeadHomeCard from "@/components/DepLeadHomeCard.vue";
import EmployeeCard from "@/components/EmployeeCard.vue";
import DocumentsCard from "@/components/DocumentsCard.vue";
import EditRPD from "@/components/EditRPD.vue";
import EditRPDDocument from "@/components/placeholder/EditRPDDocument.vue";

import { KSwitchButton } from "@kosygin-rsu/components";
import { ref, onMounted } from "vue";
import { getPlanById, getDisciplinesFileTypes } from "@/core";
import { stringFirstToUpper } from "@/utils";
import { useRoute } from "vue-router";

const route = useRoute();

const id = route.params.id;
const disciplineId = route.params.rpdId as string;
const title = route.meta.breadcrumbs as string;
const data = ref(await getPlanById(typeof id == "string" ? id : undefined));

const documentSelector = ref([true, false, false]);
const currentFileId = ref("");

async function changeDocument(ind: number) {
  documentSelector.value = [false, false, false];
  documentSelector.value[ind] = true;
  if (ind == 0) currentFileId.value = (await getDisciplinesFileTypes()).find((el) => el.title == "Программа")?.id ?? "";
  if (ind == 1) currentFileId.value = (await getDisciplinesFileTypes()).find((el) => el.title == "Аннотация")?.id ?? "";
  if (ind == 2) currentFileId.value = (await getDisciplinesFileTypes()).find((el) => el.title == "ФОС")?.id ?? "";
}

onMounted(async () => {
  currentFileId.value = (await getDisciplinesFileTypes()).find((el) => el.title == "Программа")?.id ?? "";
});
</script>

<template>
  <div class="edit-rpd">
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
    <div class="edit-rpd__inner">
      <EmployeeCard />
      <DocumentsCard />
    </div>
    <div class="edit-rpd__selector">
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
    <EditRPDDocument :discipline-id="disciplineId" :discipline-file-type="currentFileId" />
  </div>
</template>

<style lang="scss">
.edit-rpd {
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
