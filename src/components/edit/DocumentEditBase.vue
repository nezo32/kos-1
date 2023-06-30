<script setup lang="ts">
import { KSearchFilter, KFileDropDown, KPageSwitcher, KKIDButton } from '@kosygin-rsu/components'
import { computed } from 'vue'

const props = defineProps<{
  title?: string
  header?: string
  filter?: string

  dropdown?: boolean
  pages?: number

  currentPage: number
}>()
const emits = defineEmits<{
  (event: 'save'): void
  (event: 'next'): void
  (event: 'update:filter', filter?: string): void
  (event: 'update:currentPage', value: number): void
}>()

const filterData = computed({
  get() {
    return props.filter
  },
  set(value) {
    emits('update:filter', value)
  }
})

const pageData = computed({
  get() {
    return props.currentPage
  },
  set(value) {
    emits('update:currentPage', value)
  }
})
</script>

<template>
  <div class="document-edit__base">
    <div class="document-edit__base__header">
      <h5 class="table-card__header">{{ title || 'title' }}</h5>
      <div class="document-edit__base__header__filter">
        <KSearchFilter v-model="filterData" />
        <KFileDropDown v-if="dropdown">
          <slot name="dropdown" />
        </KFileDropDown>
      </div>
    </div>
    <h1 class="page__header">{{ header || 'header' }}</h1>
    <slot />
    <div class="document-edit__base__footer">
      <div class="document-edit__base__footer__buttons">
        <KKIDButton content="Сохранить изменения" general @click="emits('save')" />
        <KKIDButton content="Далее" @click="emits('next')" />
      </div>
      <KPageSwitcher :count-pages="pages || 54" v-model:current-page="pageData" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.document-edit__base {
  color: var(--main-text);

  border-radius: 20px;
  background: var(--white, #fff);
  padding: 20px;

  display: flex;
  flex-direction: column;
  gap: 30px;

  &__footer {
    margin-top: 60px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    &__buttons {
      display: flex;
      flex-direction: row;
      gap: 20px;

      > * {
        width: 240px;
      }
    }
  }

  &__header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    &__filter {
      display: flex;
      flex-direction: row;
      gap: 10px;
    }
  }

  > h1 {
    text-align: center;
  }
}
</style>
