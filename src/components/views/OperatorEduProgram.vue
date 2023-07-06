<script setup lang="ts">
import { KTable } from "@kosygin-rsu/components";
import DepLeadHomeCard from "@/components/DepLeadHomeCard.vue";
import EmployeeCard from "@/components/EmployeeCard.vue";
import DocumentsCard from "@/components/DocumentsCard.vue";
import { useRoute, useRouter } from "vue-router";
import { usePermissionStore } from "@/stores";
import { ref } from "vue";
import { getPlanById } from "@/core";
import { stringFirstToUpper } from "@/utils";

const route = useRoute();

const id = route.params.id;
const data = ref(await getPlanById(typeof id == "string" ? id : undefined));

const store = usePermissionStore();
const router = useRouter();

const pageT1 = ref(1);
const pageT2 = ref(1);

const tableData = [
  ["Астрономия", "В разработке", "Отсутствует", "Отклонен", "Не назначен"],
  ["Гражданское строительство", "Отклонен", "Проверен", "Разработан", "Смирнова А. А."],
  ["Генетика", "Отклонен", "Проверен", "Разработан", "Смирнова А. А."]
];

function tableRoutingDisciplines(v: string[]) {
  store.permission == "Преподаватель"
    ? router.push(route.fullPath + "/work_discipline/edit")
    : router.push(route.fullPath + "/work_discipline");
}
function tableRoutingPractice(v: string[]) {
  store.permission == "Преподаватель"
    ? router.push(route.fullPath + "/work_practice/edit")
    : router.push(route.fullPath + "/work_practice");
}
</script>

<template>
  <div class="edu-program">
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
    <div class="edu-program__inner">
      <EmployeeCard />
      <DocumentsCard />
    </div>
    <KTable
      v-model:current-page="pageT1"
      :routing-handler="tableRoutingDisciplines"
      :headers="['Дисциплина', 'Аннотация', 'Программа', 'ФОС', 'Ответственный']"
      :pages="1"
      title="Рабочие программы дисциплин"
      :content="tableData"
    />
    <KTable
      v-model:current-page="pageT2"
      :routing-handler="tableRoutingPractice"
      :headers="['Дисциплина', 'Аннотация', 'Программа', 'ФОС', 'Ответственный']"
      :pages="1"
      title="Рабочие программы практик"
      :content="tableData"
    />
  </div>
</template>

<style scoped lang="scss">
.edu-program {
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
}
</style>
