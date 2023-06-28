<script setup lang="ts">
import { KSwitchButton } from '@kosygin-rsu/components'
import { nextTick, ref } from 'vue'
import Document from '@/components/Document.vue'
import DepLeadHomeCard from '@/components/DepLeadHomeCard.vue'
import EmployeeCard from '@/components/EmployeeCard.vue'

const documentSelector = ref([true, false, false])

async function changeDocument(ind: number) {
  documentSelector.value = [false, false, false]
  await nextTick()
  documentSelector.value[ind] = true
}
</script>

<template>
  <div class="work-program">
    <DepLeadHomeCard
      code="01.03.02"
      name="Прикладная математика и информатика"
      direction="Системное программирование и компьютерные технологии"
      form="Очно-заочная"
      graduate="Ассистентура-стажировка"
      year="2021 год"
      filled="2%"
    />
    <div class="work-program__inner">
      <EmployeeCard />
      <EmployeeCard />
    </div>
    <div class="work-program__selector">
      <KSwitchButton
        content="Рабочая программа дисциплины"
        v-model="documentSelector[0]"
        @click="changeDocument(0)"
      />
      <KSwitchButton
        content="Аннотация рабочей программы дисциплины"
        v-model="documentSelector[1]"
        @click="changeDocument(1)"
      />
      <KSwitchButton
        content="Оценочные средства по дисциплине"
        v-model="documentSelector[2]"
        @click="changeDocument(2)"
      />
    </div>
    <Document
      status="Ожидает проверки"
      pdf="https://ncu.rcnpv.com.tw/Uploads/20131231103232738561744.pdf"
    />
  </div>
</template>

<style lang="scss">
.work-program {
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
  &__selector {
    display: flex;
    flex-direction: row;
    gap: 20px;

    > .switch__button {
      width: 100%;
      > * {
        width: 100%;
        padding: 12px 10px !important;
      }
    }

    border-radius: 20px;
    background: var(--white);
    padding: 10px 20px;
  }
}
</style>
