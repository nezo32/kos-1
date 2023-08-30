<script setup lang="ts">
import { KFileDropDown, KPageSwitcher, KSearchFilter } from "@kosygin-rsu/components";

const props = defineProps<{
  status?: string;
  pdf?: string;
}>();
</script>

<template>
  <div class="document">
    <div class="document__header" v-if="pdf">
      <div class="document__header__status" v-if="status">
        <span class="search__text">{{ status }}</span>
      </div>
      <KSearchFilter />
      <KFileDropDown />
    </div>
    <div class="document__content">
      <iframe width="100%" height="1120px" :src="pdf" frameborder="0" v-if="pdf" />
      <h2 v-else class="table-card__header">Файл не найден</h2>
    </div>
    <!-- <KPageSwitcher :count-pages="54" v-if="pdf" /> -->
  </div>
</template>

<style scoped lang="scss">
.document {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;

  padding: 20px;
  border-radius: 20px;
  background: var(--white, #fff);

  &__header {
    width: fit-content;
    align-self: flex-end;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;

    &__status {
      padding: 11px 17px;
      border-radius: 10px;
      background: var(--background, #f4f7fe);
      color: var(--main-text);
    }
  }
  &__content {
    width: 100%;

    > h2 {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 450px;
      color: var(--main-text);
    }
  }
}
</style>
