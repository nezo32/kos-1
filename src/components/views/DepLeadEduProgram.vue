<script setup lang="ts">
import { KNewTable, KTableTypes } from "@kosygin-rsu/components";
import { useRoute, useRouter } from "vue-router";
import { ref, type HTMLAttributes } from "vue";
import DepLeadHomeCard from "@/components/DepLeadHomeCard.vue";
import EmployeeCard from "@/components/EmployeeCard.vue";
import DocumentsCard from "@/components/DocumentsCard.vue";
import ModalSetSupervisor from "../modals/ModalSetSupervisor.vue";
import { getPlanById } from "@/core";
import { paginationDiscipline, paginationPractice } from "@/core/programs";
import { stringFirstToUpper } from "@/utils";

const route = useRoute();

const id = route.params.id;
const data = ref(await getPlanById(typeof id == "string" ? id : undefined));

const router = useRouter();

const pageD = ref(1);
const pageP = ref(1);

function tableRoutingDisciplines(_: any, v: { id: string }) {
  router.push(route.fullPath + `/work_discipline/${v.id}/edit`);
}
function tableRoutingPractice(_: any, v: { id: string }) {
  router.push(route.fullPath + `/work_practice/${v.id}/edit`);
}

const which = ref<string[]>([]);
const modalActive = ref(false);
const selected = ref("");
const saved = ref(false);

function selectSupevisorHandler(data: string[]) {
  modalActive.value = true;
  which.value = data;
}

const head: KTableTypes.TableHeadType<Record<string | number | symbol, string | null | undefined>> = {
  name: {
    title: "Дисциплина",
    width: "444px"
  },

  program: {
    title: "Программа",
    width: "120px",
    hideOrder: true
  },
  annotation: {
    title: "Аннотация",
    width: "150px",
    hideOrder: true
  },
  fos: {
    title: "ФОС",
    width: "140px",
    hideOrder: true
  }
};

function applyStyle(content: string) {
  const styles: HTMLAttributes["class"] = {
    grey: content == "Отсутствует" || content == "В разработке",
    red: content == "Отклонен",
    green: content == "Проверен"
  };
  return styles;
}
</script>

<template>
  <div class="dep-led-edu-program">
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
    <div class="dep-led-edu-program__inner">
      <EmployeeCard />
      <DocumentsCard />
    </div>
    <KNewTable
      @row-click="tableRoutingDisciplines"
      subtitle=""
      :head="head"
      title="Рабочие программы дисциплин"
      v-model:page="pageP"
      :pagination="(page, max, search, order) => paginationDiscipline(id as string, page, max, search, order)"
      style="width: 1040px !important; box-sizing: border-box"
    >
      <template #fos="{ content }">
        <span :class="applyStyle(content)">{{ content }}</span>
      </template>
      <template #annotation="{ content }">
        <span :class="applyStyle(content)">{{ content }}</span>
      </template>
      <template #program="{ content }">
        <span :class="applyStyle(content)">{{ content }}</span>
      </template></KNewTable
    >
    <KNewTable
      @row-click="tableRoutingPractice"
      subtitle=""
      :head="head"
      title="Рабочие программы практик"
      v-model:page="pageD"
      :pagination="(page, max, search, order) => paginationPractice(id as string, page, max, search, order)"
      style="width: 1040px !important; box-sizing: border-box"
    >
      <template #fos="{ content }">
        <span :class="applyStyle(content)">{{ content }}</span>
      </template>
      <template #annotation="{ content }">
        <span :class="applyStyle(content)">{{ content }}</span>
      </template>
      <template #program="{ content }">
        <span :class="applyStyle(content)">{{ content }}</span>
      </template></KNewTable
    >
    <ModalSetSupervisor
      v-if="modalActive"
      v-model:active="modalActive"
      v-model:save="saved"
      v-model:selected="selected"
    />
  </div>
</template>

<style lang="scss">
.grey {
  color: var(--unactive-text);
}
.red {
  color: var(--rejected);
}
.green {
  color: var(--resolved);
}

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
