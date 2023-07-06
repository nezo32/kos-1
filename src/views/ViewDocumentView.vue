<script setup lang="ts">
import { KTable } from "@kosygin-rsu/components";
import DepLeadHomeCard from "@/components/DepLeadHomeCard.vue";
import EmployeeCard from "@/components/EmployeeCard.vue";
import DocumentsCard from "@/components/DocumentsCard.vue";
import { useRoute, useRouter } from "vue-router";
import Document from "@/components/Document.vue";

import { ref } from "vue";
import { getPlanById } from "@/core";
import { stringFirstToUpper } from "@/utils";

const route = useRoute();

const id = route.params.id;
const data = ref(await getPlanById(typeof id == "string" ? id : undefined));
</script>

<template>
  <div class="view-document">
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
    <div class="view-document__inner">
      <EmployeeCard />
      <DocumentsCard />
    </div>
    <Document pdf="https://ncu.rcnpv.com.tw/Uploads/20131231103232738561744.pdf" />
  </div>
</template>

<style scoped lang="scss">
.view-document {
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
