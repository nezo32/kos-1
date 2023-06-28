<script setup lang="ts">
import { KFilter, KFilterResetIcon } from '@kosygin-rsu/components'
import DepLeadHomeCard from '@/components/DepLeadHomeCard.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="dep-lead-home">
    <div class="dep-lead-home__filter">
      <KFilter style="width: 250px" placeholder="Кафедра" />
      <KFilter style="width: 200px" placeholder="Код направления" />
      <KFilter style="width: 120px" placeholder="Год" />
      <KFilterResetIcon />
    </div>
    <div class="dep-lead-home__content">
      <DepLeadHomeCard
        @click="router.push(`programs/${i}`)"
        v-for="i in 3"
        code="01.03.02"
        name="Прикладная математика и информатика"
        direction="Системное программирование и компьютерные технологии"
        form="Очно-заочная"
        graduate="Ассистентура-стажировка"
        year="2021 год"
        filled="2%"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.dep-lead-home {
  display: flex;
  flex-direction: column;
  gap: 20px;

  &__filter {
    width: fit-content;
    align-self: flex-end;

    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;

    border-radius: 20px;
    background: var(--white, white);
    padding: 10px 20px;

    > * {
      flex-shrink: 0;
    }

    > *:first-child {
      flex-shrink: unset;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
}
</style>
