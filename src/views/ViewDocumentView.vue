<script setup lang="ts">
import DepLeadHomeCard from "@/components/DepLeadHomeCard.vue";
import EmployeeCard from "@/components/EmployeeCard.vue";
import DocumentsCard from "@/components/DocumentsCard.vue";
import { useRoute } from "vue-router";
import Document from "@/components/Document.vue";
import { getURL } from "@/core";

import { stringFirstToUpper } from "@/utils";
import { onMounted, onUpdated, ref, watch } from "vue";
import { getPlanById } from "@/core";
import type { Plans } from "@/types/directus";

const route = useRoute();

const id = ref(route.params.id);
const data = ref<Plans | undefined>((await getPlanById(typeof id.value == "string" ? id.value : undefined)) as Plans);

const url = ref<string | undefined>();

async function refresh() {
  id.value = route.params.id as string;
  data.value = (await getPlanById(typeof id.value == "string" ? id.value : undefined)) as Plans;
  url.value = await getURL(id.value, route.params.documentId as string);
}

onMounted(async () => {
  await refresh();
});
onUpdated(async () => {
  await refresh();
});
</script>

<template>
  <div class="view-document">
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
    <div class="view-document__inner">
      <EmployeeCard />
      <DocumentsCard />
    </div>
    <Document :pdf="url" />
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
