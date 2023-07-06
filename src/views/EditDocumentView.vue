<script setup lang="ts">
import DepLeadHomeCard from "@/components/DepLeadHomeCard.vue";
import EmployeeCard from "@/components/EmployeeCard.vue";
import DocumentsCard from "@/components/DocumentsCard.vue";
import DescriptionOOP from "@/components/edit/DescriptionOOP.vue";
import EditDocument from "@/components/placeholder/EditDocument.vue";

import { ref } from "vue";
import { getPlanById } from "@/core";
import { stringFirstToUpper } from "@/utils";
import { useRoute } from "vue-router";

const route = useRoute();

const id = route.params.id;
const title = route.meta.breadcrumbs as string;
const data = ref(await getPlanById(typeof id == "string" ? id : undefined));
</script>

<template>
  <div class="edit-document">
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
    <div class="edit-document__inner">
      <EmployeeCard />
      <DocumentsCard />
    </div>
    <EditDocument :to="(id as string)" :title="title" />
  </div>
</template>

<style scoped lang="scss">
.edit-document {
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
