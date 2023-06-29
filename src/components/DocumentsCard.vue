<script setup lang="ts">
import { usePermissionStore } from '@/stores'
import { KDocumentStatusIcon } from '@kosygin-rsu/components'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const store = usePermissionStore()

function routing(where: string) {
  let end = '/' + where
  if (store.permission == 'Руководитель ООП') end += '/edit'
  router.replace(`/programs/${route.params.id + end}`)
}
</script>

<template>
  <div class="documents__card">
    <h4 class="table-card__header">Основные документы</h4>
    <div
      class="documents__card__section"
      @click="routing('oop_annotation')"
      :class="{ current: route.fullPath.includes('oop_annotation') }"
    >
      <KDocumentStatusIcon :status="0" />
      <span class="card__text">Аннотоация ООП</span>
    </div>
    <div
      class="documents__card__section"
      @click="routing('oop_description')"
      :class="{ current: route.fullPath.includes('oop_description') }"
    >
      <KDocumentStatusIcon :status="1" />
      <span class="card__text">Описание ООП</span>
    </div>
    <div
      class="documents__card__section"
      @click="routing('training_program')"
      :class="{ current: route.fullPath.includes('training_program') }"
    >
      <KDocumentStatusIcon :status="2" />
      <span class="card__text">Учебный план</span>
    </div>
    <div
      class="documents__card__section"
      @click="routing('study_schedule')"
      :class="{ current: route.fullPath.includes('study_schedule') }"
    >
      <KDocumentStatusIcon :status="3" />
      <span class="card__text">Календарный учебный график</span>
    </div>
    <div
      class="documents__card__section"
      @click="routing('сompetence_matrix')"
      :class="{ current: route.fullPath.includes('сompetence_matrix') }"
    >
      <KDocumentStatusIcon :status="4" />
      <span class="card__text">Матрица компетенций</span>
    </div>
    <div
      class="documents__card__section"
      @click="routing('staffing')"
      :class="{ current: route.fullPath.includes('staffing') }"
    >
      <KDocumentStatusIcon :status="1" />
      <span class="card__text">Справка о кадровом обеспечении</span>
    </div>
    <div
      class="documents__card__section"
      @click="routing('logistics')"
      :class="{ current: route.fullPath.includes('logistics') }"
    >
      <KDocumentStatusIcon :status="2" />
      <span class="card__text">Справка о материально-техническом обеспечении</span>
    </div>
    <div
      class="documents__card__section"
      @click="routing('gia_program')"
      :class="{ current: route.fullPath.includes('gia_program') }"
    >
      <KDocumentStatusIcon :status="3" />
      <span class="card__text">Программа ГИА</span>
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
