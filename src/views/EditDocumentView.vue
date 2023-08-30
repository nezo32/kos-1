<script setup lang="ts">
import DepLeadHomeCard from "@/components/DepLeadHomeCard.vue";
import EmployeeCard from "@/components/EmployeeCard.vue";
import DocumentsCard from "@/components/DocumentsCard.vue";
import DescriptionOOP from "@/components/edit/DescriptionOOP.vue";
import EditDocument from "@/components/placeholder/EditDocument.vue";

import { ref, watch, onUpdated } from "vue";
import { db, getPlanById } from "@/core";
import { readItems } from "@directus/sdk";
import { stringFirstToUpper } from "@/utils";
import { useRoute } from "vue-router";

const route = useRoute();

const docTypeNameMap = ref<Map<string, string | null | undefined>>(new Map());

const id = route.params.id;
const oopFileTypeId = route.params.documentId as string;
const data = ref(await getPlanById(typeof id == "string" ? id : undefined));

const reqFilesTypes = await db.request(
  readItems("oop_files_types", {
    fields: ["id", "title"]
  })
);

reqFilesTypes.forEach((el) => {
  docTypeNameMap.value?.set(el.id, el.title);
});

const view = ref(docTypeNameMap.value?.get(oopFileTypeId));

watch(route, (n) => {
  view.value = docTypeNameMap.value?.get(n.params.documentId as string);
});
</script>

<template>
  <div class="edit-document">
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
    <div class="edit-document__inner">
      <EmployeeCard />
      <DocumentsCard />
    </div>
    <!-- <EditDocument :plan-id="(id as string)" :oop-file-type-id="(oopFileTypeId as string)" /> -->
    <DescriptionOOP v-if="view == 'Аннотация ООП'" />
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
