<script setup lang="ts">
import { KSearchFilter, KFileDropDown, KPageSwitcher, KKIDButton, KLockSecurityIcon } from "@kosygin-rsu/components";
import { computed } from "vue";

const props = defineProps<{
  title?: string;
  header?: string;
  filter?: string;

  dropdown?: boolean;
  pages?: number;

  currentPage: number;

  booked?: boolean;
  worker?: string;
}>();
const emits = defineEmits<{
  (event: "save"): void;
  (event: "next"): void;
  (event: "update:filter", filter?: string): void;
  (event: "update:currentPage", value: number): void;
}>();

const filterData = computed({
  get() {
    return props.filter;
  },
  set(value) {
    emits("update:filter", value);
  }
});

const pageData = computed({
  get() {
    return props.currentPage;
  },
  set(value) {
    emits("update:currentPage", value);
  }
});
</script>

<template>
  <div class="document-edit__base">
    <div class="document-edit__base__header">
      <h5 class="table-card__header">{{ title || "title" }}</h5>
      <div class="document-edit__base__header__filter" v-if="booked">
        <section>
          <div></div>
          <p>{{ worker ? "Документ редактирует: " + worker : "Документ редактируется" }}</p>
        </section>
        <KLockSecurityIcon />
      </div>
    </div>
    <h1 class="page__header">{{ header || "header" }}</h1>
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
      align-items: center;
      gap: 10px;

      > section {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 17px;
        background: var(--background);
        border-radius: 10px;
        > div {
          border-radius: 100%;
          background-color: var(--resolved);
          width: 10px;
          height: 10px;
        }
      }

      > * {
        &:nth-child(2) {
          color: var(--elements);
          padding: 10px 12px;
        }
      }
    }
  }

  > h1 {
    text-align: center;
  }
}
</style>
