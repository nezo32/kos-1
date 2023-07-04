<script setup lang="ts">
import { KForms } from '@kosygin-rsu/components'
import InsertAnswer from './InsertAnswer.vue'
</script>

<template>
  <div class="o7">
    <section>
      <KForms type="dropdown" header="Уровень образования" :content="[]" />
      <InsertAnswer />
    </section>
    <section>
      <KForms
        type="dropdown"
        header="Внешняя оценка качества образовательной деятельности по образовательной программе"
        :content="[]"
      />
    </section>
  </div>
</template>

<style scoped lang="scss">
.o7 {
  display: flex;
  flex-direction: column;
  gap: 80px;

  > section {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  &__inner {
    display: flex;
    flex-direction: row;
    gap: 20px;
    > * {
      width: 100%;
    }
  }
}
</style>
