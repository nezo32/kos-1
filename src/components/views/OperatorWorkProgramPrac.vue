<script setup lang="ts">
import { KSwitchButton } from "@kosygin-rsu/components";
import { nextTick, ref } from "vue";
import Document from "@/components/Document.vue";
import DepLeadHomeCard from "@/components/DepLeadHomeCard.vue";
import EmployeeCard from "@/components/EmployeeCard.vue";

import { getPlanById } from "@/core";
import { stringFirstToUpper } from "@/utils";
import { useRoute } from "vue-router";

const route = useRoute();

const id = route.params.id;
const data = ref(await getPlanById(typeof id == "string" ? id : undefined));

const documentSelector = ref([true, false, false]);

async function changeDocument(ind: number) {
  documentSelector.value = [false, false, false];
  await nextTick();
  documentSelector.value[ind] = true;
}
</script>

<template>
  <div class="work-program">
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
    <div class="work-program__inner">
      <EmployeeCard />
      <EmployeeCard />
    </div>
    <div class="work-program__selector">
      <KSwitchButton content="Рабочая программа практики" v-model="documentSelector[0]" @click="changeDocument(0)" />
      <KSwitchButton
        content="Аннотация рабочей программы практики"
        v-model="documentSelector[1]"
        @click="changeDocument(1)"
      />
      <KSwitchButton
        content="Оценочные средства по практике"
        v-model="documentSelector[2]"
        @click="changeDocument(2)"
      />
    </div>
    <Document status="Ожидает проверки" pdf="https://ncu.rcnpv.com.tw/Uploads/20131231103232738561744.pdf" />
  </div>
</template>

<style lang="scss"></style>
