<script setup lang="ts">
import DepLeadHomeCard from '@/components/DepLeadHomeCard.vue'
import EmployeeCard from '@/components/EmployeeCard.vue'
import DocumentsCard from '@/components/DocumentsCard.vue'
import EditRPD from '@/components/EditRPD.vue'
</script>

<template>
  <div class="edit-rpd">
    <DepLeadHomeCard
      code="01.03.02"
      name="Прикладная математика и информатика"
      direction="Системное программирование и компьютерные технологии"
      form="Очно-заочная"
      graduate="Ассистентура-стажировка"
      year="2021 год"
      filled="2%"
    />
    <div class="edit-rpd__inner">
      <EmployeeCard />
      <DocumentsCard />
    </div>
    <EditRPD />
  </div>
</template>

<style scoped lang="scss">
.edit-rpd {
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
