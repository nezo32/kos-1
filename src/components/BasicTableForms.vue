<script setup lang="ts">
import { KHintIcon } from '@kosygin-rsu/components'

defineProps<{
  header?: string
}>()
</script>

<template>
  <div class="basic__table-forms">
    <div class="basic__table-forms__header">
      <span class="input__header">{{ header || 'header' }}</span>
      <KHintIcon active />
    </div>
    <div class="basic__table-forms__content">
      <div class="basic__table-forms__content__head">
        <slot name="head" />
      </div>
      <div class="basic__table-forms__content__body">
        <slot name="body" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.basic__table-forms {
  display: flex;
  flex-direction: column;
  gap: 6px;
  &__header {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;

    color: var(--elements);
  }
  &__content {
    padding-bottom: 35px;

    border-radius: 10px;
    border: 1px solid var(--unactive-text, #a3aed0);
    background: var(--white, #fff);

    &__head {
      padding: 13px 30px;

      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      padding-bottom: 13px;
      background: var(--background, #f4f7fe);
    }
    &__body {
      padding: 0px 30px;
      padding-top: 25px;
    }
  }
}
</style>
