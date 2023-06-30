<script setup lang="ts">
import { KForms } from '@kosygin-rsu/components'
</script>

<template>
  <div class="o1">
    <section>
      <KForms
        type="dropdown"
        :content="[]"
        header="Основная профессиональная образовательная программа по"
      />
      <KForms type="dropdown" :content="[]" header="Код направления подготовки" />
      <KForms type="dropdown" :content="[]" header="Наименование направления подготовки" />
      <KForms type="dropdown" :content="[]" header="Профиль" />
    </section>
    <section>
      <KForms type="multi" :content="[]" header="Целью образовательной программы является:" />
    </section>
    <section>
      <div class="o1__inner">
        <KForms type="dropdown" :content="[]" header="Форма обучения" />
        <KForms type="input" :content="[]" header="Объем образовательной программы составляет" />
      </div>
      <KForms
        type="dropdown"
        :content="[]"
        header="Срок получения образования по образовательной программе"
      />
    </section>
    <section>
      <KForms
        type="multi"
        :content="[]"
        header="Государственная итоговая аттестация включает в себя:"
      />
    </section>
  </div>
</template>

<style scoped lang="scss">
.o1 {
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
