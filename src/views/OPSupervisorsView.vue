<script setup lang="ts">
import ModalSetSupervisor from '@/components/modals/ModalSetSupervisor.vue'
import { KFilter, KFilterResetIcon, KTable } from '@kosygin-rsu/components'
import { reactive, ref, watch } from 'vue'

const data = reactive([
  ['38.03.04', 'Сервис', 'Фортепиано', 'Очная', 'Назначить'],
  ['39.03.04', 'Социология', 'Информационные системы и технологии', 'Очно-заочная', 'Зуев П. И.'],
  [
    '20.03.01',
    'Культурология',
    'Фотоискусство и мультимедиадизайн',
    'Очно-заочная',
    'Высоцкий А. М.'
  ],
  [
    '15.03.02',
    'Информационные системы и технологии',
    'Маркетинг и бренд-менеджмент',
    'Очно-заочная',
    'Назначить'
  ]
])

const which = ref<string[]>([])

const modalActive = ref(false)
const selected = ref('')
const saved = ref(false)

watch(saved, () => {
  if (!saved.value) return
  const changeInd = data.findIndex((el) => which.value.toString() == el.toString())
  data[changeInd][data.length] = selected.value
  selected.value = ''
  modalActive.value = false
  saved.value = false
})

function selectSupevisorHandler(data: string[]) {
  modalActive.value = true
  which.value = data
}
</script>

<template>
  <div class="supervisors-op">
    <div class="supervisors-op__filters">
      <KFilter placeholder="Институт" />
      <KFilter placeholder="Кафедра" style="width: 250px" />
      <KFilter placeholder="Код направления" style="width: 200px" />
      <KFilter placeholder="Уровень" style="width: 120px" />
      <KFilterResetIcon />
    </div>
    <KTable
      @select="selectSupevisorHandler"
      :headers="['Код', 'Направление подготовки', 'Профиль', 'Форма', 'Руководитель']"
      title="Назначение руководителей"
      subtitle="2021 год"
      :pages="54"
      :content="data"
    />
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
