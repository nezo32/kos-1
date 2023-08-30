<script setup lang="ts">
import { getMainView, getMainFilter, type SortObject, type FilterObject } from "@/core";
import { pagination } from "@/core/main";
import { columnMapper } from "@/core/supervisors";
import { KFilter, KFilterResetIcon, KNewTable, KActionButton } from "@kosygin-rsu/components";
import { ref, shallowReactive, reactive, watch, onMounted } from "vue";
import { stringFirstToUpper } from "@/utils";
import ModalSetSupervisor from "@/components/modals/ModalSetSupervisor.vue";
import Filter from "@/components/Filter.vue";
import type { DefaultItem } from "@directus/sdk";
import type { Plans } from "@/types/directus";

const which = ref<DefaultItem<Plans>>();

const page = ref(1);
const modalActive = ref(false);
const selected = ref("");
const saved = ref(false);

watch(saved, () => {
  if (!saved.value) return;
  modalActive.value = false;
  saved.value = false;
});

function selectSupevisorHandler(data: DefaultItem<Plans>) {
  modalActive.value = true;
  which.value = data;
}
</script>

<template>
  <div class="supervisors-op">
    <!-- <div class="supervisors-op__filters">
      <KFilter placeholder="Институт" v-model="institution" :content="iDropDown" :trigger="filterTrigger" />
      <Filter placeholder="Код направления" v-model="code" style="width: 200px" />
      <KFilter placeholder="Форма" v-model="form" style="width: 180px" :content="fDropDown" :trigger="filterTrigger" />
      <KFilterResetIcon @click="filterTrigger = !filterTrigger" />
    </div> -->
    <KNewTable
      v-model:page="page"
      title="Основные образовательные программы"
      subtitle="2021 год"
      :head="{
        'oop.code': { title: 'Код', width: '90px' },
        'oop.name': { title: 'Направление подготовки', width: '255px' },
        'active_oop.name': { title: 'Профиль', width: '255px' },
        qualification: { title: 'Квалификация', width: '150px' },
        'edu_form.name': { title: 'Форма', width: '140px' },
        faculty: { title: 'Руководитель', width: '140px', hideOrder: true }
      }"
      :pagination="pagination"
      :column-mapper="columnMapper"
      style="width: 1040px !important; box-sizing: border-box"
    >
      <template #faculty="{ content, data }">
        <span v-if="!!content"> {{ content }} </span>
        <span v-else>
          <KActionButton content="Назначить" @click="selectSupevisorHandler(data)"></KActionButton>
        </span>
      </template>
    </KNewTable>
  </div>
  <ModalSetSupervisor
    v-if="modalActive"
    v-model:active="modalActive"
    v-model:save="saved"
    v-model:selected="selected"
  />
</template>

<style lang="scss">
.supervisors-op {
  .table__row {
    align-items: center;
  }
  .action__button {
    button {
      border: 1px solid var(--elements);
      padding: 1.5px 10px;
      line-height: normal;
      font-size: 14px;
      font-weight: 500;
    }
  }

  display: flex;
  flex-direction: column;
  gap: 20px;
  &__filters {
    padding: 10px 20px;
    border-radius: 20px;
    background: var(--white, #fff);

    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;

    > * {
      flex-shrink: 0;
      &:first-child {
        flex-shrink: unset;
      }
    }
  }
  .table__text.select {
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
