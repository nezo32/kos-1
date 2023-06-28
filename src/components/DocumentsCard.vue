<script setup lang="ts">
import { KDocumentStatusIcon } from '@kosygin-rsu/components'
</script>

<template>
  <div class="documents__card">
    <h4 class="table-card__header">Основные документы</h4>
    <div class="documents__card__section">
      <KDocumentStatusIcon :status="0" />
      <span class="card__text">Аннотоация ООП</span>
    </div>
    <div class="documents__card__section">
      <KDocumentStatusIcon :status="1" />
      <span class="card__text">Описание ООП</span>
    </div>
    <div class="documents__card__section">
      <KDocumentStatusIcon :status="2" />
      <span class="card__text">Учебный план</span>
    </div>
    <div class="documents__card__section">
      <KDocumentStatusIcon :status="3" />
      <span class="card__text">Календарный учебный график</span>
    </div>
    <div class="documents__card__section">
      <KDocumentStatusIcon :status="4" />
      <span class="card__text">Матрица компетенций</span>
    </div>
    <div class="documents__card__section">
      <KDocumentStatusIcon :status="1" />
      <span class="card__text">Справка о кадровом обеспечении</span>
    </div>
    <div class="documents__card__section">
      <KDocumentStatusIcon :status="2" />
      <span class="card__text">Справка о материально-техническом обеспечении</span>
    </div>
    <div class="documents__card__section">
      <KDocumentStatusIcon :status="3" />
      <span class="card__text">Программа ГИА</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
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
  }
}
</style>
