<script setup lang="ts">
import { KTable } from "@kosygin-rsu/components";
import { useRoute, useRouter } from "vue-router";
import { reactive, ref, watch } from "vue";
import DepLeadHomeCard from "@/components/DepLeadHomeCard.vue";
import EmployeeCard from "@/components/EmployeeCard.vue";
import DocumentsCard from "@/components/DocumentsCard.vue";
import ModalSetSupervisor from "../modals/ModalSetSupervisor.vue";
import { getPlanById } from "@/core";
import { stringFirstToUpper } from "@/utils";

const route = useRoute();

const id = route.params.id;
const data = ref(await getPlanById(typeof id == "string" ? id : undefined));

const router = useRouter();

const tableData = reactive([
  ["Астрономия", "В разработке", "Отсутствует", "Отклонен", "Назначить"],
  ["Гражданское строительство", "Отклонен", "Проверен", "Разработан", "Смирнова А. А."],
  ["Генетика", "Отклонен", "Проверен", "Разработан", "Назначить"]
]);

function tableRoutingDisciplines(v: string[], ev?: MouseEvent) {
  const content = (ev?.target as HTMLElement).textContent;
  if (content != "Назначить") router.push(route.fullPath + "/work_discipline/edit");
}
function tableRoutingPractice(v: string[], ev?: MouseEvent) {
  const content = (ev?.target as HTMLElement).textContent;
  if (content != "Назначить") router.push(route.fullPath + "/work_practice/edit");
}

const which = ref<string[]>([]);
const modalActive = ref(false);
const selected = ref("");
const saved = ref(false);

function selectSupevisorHandler(data: string[]) {
  modalActive.value = true;
  which.value = data;
}

watch(saved, () => {
  if (!saved.value) return;
  const changeInd = tableData.findIndex((el) => which.value.toString() == el.toString());
  tableData[changeInd][tableData.length + 1] = selected.value;
  selected.value = "";
  modalActive.value = false;
  saved.value = false;
});
</script>

<template>
  <div class="dep-led-edu-program">
    <DepLeadHomeCard
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
    <div class="dep-led-edu-program__inner">
      <EmployeeCard />
      <DocumentsCard />
    </div>
    <KTable
      :current-page="1"
      @select="selectSupevisorHandler"
      :routing-handler="tableRoutingDisciplines"
      :headers="['Дисциплина', 'Аннотация', 'Программа', 'ФОС', 'Ответственный']"
      :pages="1"
      title="Рабочие программы дисциплин"
      :content="tableData"
    />
    <KTable
      :current-page="1"
      @select="selectSupevisorHandler"
      :routing-handler="tableRoutingPractice"
      :headers="['Дисциплина', 'Аннотация', 'Программа', 'ФОС', 'Ответственный']"
      :pages="1"
      title="Рабочие программы практик"
      :content="tableData"
    />
    <ModalSetSupervisor
      v-if="modalActive"
      v-model:active="modalActive"
      v-model:save="saved"
      v-model:selected="selected"
    />
  </div>
</template>

<style lang="scss">
.dep-led-edu-program {
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
  .table__text.select {
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
