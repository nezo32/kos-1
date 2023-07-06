<script setup lang="ts">
import DepLeadHomeCard from "@/components/DepLeadHomeCard.vue";
import EmployeeCard from "@/components/EmployeeCard.vue";
import DocumentsCard from "@/components/DocumentsCard.vue";
import EditRPD from "@/components/EditRPD.vue";
import EditDocument from "@/components/placeholder/EditDocument.vue";

import { KSwitchButton } from "@kosygin-rsu/components";
import { ref, nextTick } from "vue";
import { getPlanById } from "@/core";
import { stringFirstToUpper } from "@/utils";
import { useRoute } from "vue-router";

const route = useRoute();

const id = route.params.id;
const title = route.meta.breadcrumbs as string;
const data = ref(await getPlanById(typeof id == "string" ? id : undefined));

const documentSelector = ref([true, false, false]);

async function changeDocument(ind: number) {
  documentSelector.value = [false, false, false];
  await nextTick();
  documentSelector.value[ind] = true;
}
</script>

<template>
  <div class="edit-rpd">
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
    <EditDocument :to="(id as string)" :title="title" />
  </div>
</template>

<style scoped lang="scss"></style>
