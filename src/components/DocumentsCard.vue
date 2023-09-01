<script setup lang="ts">
import { getOOPDocumentsTypes, getOOPDocumentsUploaded } from "@/core";
import { useUserStore } from "@/stores";
import type { OopFiles, OopFilesTypes } from "@/types/directus";
import { KDocumentStatusIcon } from "@kosygin-rsu/components";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const store = useUserStore();

function routing(where: string) {
  let end = "/" + where;
  if (store.permission == "Руководитель ООП") end += "/edit";
  router.replace(`/programs/${route.params.id + end}`);
}

const documentTypes = ref<OopFilesTypes[]>([]);
const documentTypesUploaded = ref<OopFiles[]>([]);

function getDocumentTypeStatus(id: string) {
  const found = documentTypesUploaded.value.find((el) => el.type == id);
  return !found || !found.file ? 4 : 1;
}

onMounted(async () => {
  documentTypes.value = await getOOPDocumentsTypes();
  documentTypesUploaded.value = await getOOPDocumentsUploaded(route.params.id as string);
});
</script>

<template>
  <div class="documents__card">
    <h4 class="table-card__header">Основные документы</h4>
    <div
      v-for="v in documentTypes"
      :key="v.id"
      class="documents__card__section"
      @click="routing(v.id)"
      :class="{ current: route.fullPath.includes(v.id) }"
    >
      <KDocumentStatusIcon :status="getDocumentTypeStatus(v.id)" />
      <span class="card__text" style="line-height: unset !important">{{ v.title }}</span>
    </div>
  </div>
</template>

<style lang="scss">
.documents__card {
  color: var(--main-text);
  border-radius: 20px;
  background: var(--white);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  &__section {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 15px;

    &.current {
      > span {
        color: var(--elements);
      }
    }

    > *:first-child {
      flex-shrink: 0;
    }
    white-space: nowrap;

    &:hover {
      > span {
        color: var(--elements);
      }
    }

    cursor: pointer;
  }
}
</style>
