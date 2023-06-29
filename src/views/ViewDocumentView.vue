<script setup lang="ts">
import { KTable } from '@kosygin-rsu/components'
import DepLeadHomeCard from '@/components/DepLeadHomeCard.vue'
import EmployeeCard from '@/components/EmployeeCard.vue'
import DocumentsCard from '@/components/DocumentsCard.vue'
import { useRoute, useRouter } from 'vue-router'
import Document from '@/components/Document.vue'

const router = useRouter()
const route = useRoute()

const tableData = [
  ['Астрономия', 'В разработке', 'Отсутствует', 'Отклонен', 'Не назначен'],
  ['Гражданское строительство', 'Отклонен', 'Проверен', 'Разработан', 'Смирнова А. А.'],
  ['Генетика', 'Отклонен', 'Проверен', 'Разработан', 'Смирнова А. А.']
]
</script>

<template>
  <div class="view-document">
    <DepLeadHomeCard
      code="01.03.02"
      name="Прикладная математика и информатика"
      direction="Системное программирование и компьютерные технологии"
      form="Очно-заочная"
      graduate="Ассистентура-стажировка"
      year="2021 год"
      filled="2%"
    />
    <div class="view-document__inner">
      <EmployeeCard />
      <DocumentsCard />
    </div>
    <Document pdf="https://ncu.rcnpv.com.tw/Uploads/20131231103232738561744.pdf" />
  </div>
</template>

<style scoped lang="scss">
.view-document {
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
}
</style>
