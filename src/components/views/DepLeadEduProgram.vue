<script setup lang="ts">
import { KTable } from '@kosygin-rsu/components'
import { useRoute, useRouter } from 'vue-router'
import { reactive, ref, watch } from 'vue'
import DepLeadHomeCard from '@/components/DepLeadHomeCard.vue'
import EmployeeCard from '@/components/EmployeeCard.vue'
import DocumentsCard from '@/components/DocumentsCard.vue'
import ModalSetSupervisor from '../modals/ModalSetSupervisor.vue'

const router = useRouter()
const route = useRoute()

const tableData = reactive([
  ['Астрономия', 'В разработке', 'Отсутствует', 'Отклонен', 'Назначить'],
  ['Гражданское строительство', 'Отклонен', 'Проверен', 'Разработан', 'Смирнова А. А.'],
  ['Генетика', 'Отклонен', 'Проверен', 'Разработан', 'Назначить']
])

function tableRoutingDisciplines(v: string[], ev?: MouseEvent) {
  const content = (ev?.target as HTMLElement).textContent
  if (content != 'Назначить') router.push(route.fullPath + '/work_discipline/edit')
}
function tableRoutingPractice(v: string[], ev?: MouseEvent) {
  const content = (ev?.target as HTMLElement).textContent
  if (content != 'Назначить') router.push(route.fullPath + '/work_practice/edit')
}

const which = ref<string[]>([])
const modalActive = ref(false)
const selected = ref('')
const saved = ref(false)

function selectSupevisorHandler(data: string[]) {
  modalActive.value = true
  which.value = data
}

watch(saved, () => {
  if (!saved.value) return
  const changeInd = tableData.findIndex((el) => which.value.toString() == el.toString())
  tableData[changeInd][tableData.length + 1] = selected.value
  selected.value = ''
  modalActive.value = false
  saved.value = false
})
</script>

<template>
  <div class="dep-led-edu-program">
    <DepLeadHomeCard
      code="01.03.02"
      name="Прикладная математика и информатика"
      direction="Системное программирование и компьютерные технологии"
      form="Очно-заочная"
      graduate="Ассистентура-стажировка"
      year="2021 год"
      filled="2%"
    />
    <div class="dep-led-edu-program__inner">
      <EmployeeCard />
      <DocumentsCard />
    </div>
    <KTable
      @select="selectSupevisorHandler"
      :routing-handler="tableRoutingDisciplines"
      :headers="['Дисциплина', 'Аннотация', 'Программа', 'ФОС', 'Ответственный']"
      :pages="1"
      title="Рабочие программы дисциплин"
      :content="tableData"
    />
    <KTable
      @select="selectSupevisorHandler"
      :routing-handler="tableRoutingPractice"
      :headers="['Дисциплина', 'Аннотация', 'Программа', 'ФОС', 'Ответственный']"
      :pages="1"
      title="Рабочие программы практик"
      :content="tableData"
    />
    <ModalSetSupervisor
      v-if="modalActive"
      v-model:active="modalActive"
      v-model:save="saved"
      v-model:selected="selected"
    />
  </div>
</template>

<style lang="scss">
.dep-led-edu-program {
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
  .table__text.select {
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
