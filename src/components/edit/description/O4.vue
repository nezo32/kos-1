<script setup lang="ts">
import { KForms } from '@kosygin-rsu/components'
</script>

<template>
  <div class="o4">
    <section>
      <KForms
        type="dropdown"
        :content="[]"
        header="Объем образовательной программы и ее блоков в з.е. Дисциплины (модули)"
      />
      <KForms
        type="dropdown"
        :content="[]"
        header="Объем образовательной программы и ее блоков в з.е. Практика"
      />
      <KForms
        type="dropdown"
        :content="[]"
        header="Объем образовательной программы и ее блоков в з.е. Государственная итоговая аттестация"
      />
    </section>
    <section>
      <KForms
        type="dropdown"
        :content="[]"
        header="Объем контактной работы по образовательной программе по очной форме обучения в %"
      />
      <KForms
        type="dropdown"
        :content="[]"
        header="Объем контактной работы по образовательной программе по очно-заочной форме обучения в %"
      />
      <KForms
        type="dropdown"
        :content="[]"
        header="Объем контактной работы по образовательной программе по заочной форме обучения в %"
      />
    </section>
    <section>
      <KForms
        type="multi"
        :content="[]"
        header="Типы учебной практики образовательной программы:"
      />
    </section>
    <section>
      <KForms type="multi" :content="[]" header="Типы производственной практики:" />
    </section>
    <section>
      <KForms
        type="dropdown"
        :content="[]"
        header="Государственная итоговая аттестация обучающихся по ОП проводится в форме"
      />
      <KForms
        type="multi"
        :content="[]"
        header="Практическая подготовка при реализации учебных дисциплин организуется путем проведения"
      />
    </section>
    <section>
      <KForms type="input" :content="[]" header="Организация практической подготовки" />
    </section>
    <section>
      <KForms type="multi" :content="[]" header="Технологии реализации образовательной программы" />
    </section>
    <section>
      <div class="o4__inner">
        <KForms type="dropdown" :content="[]" header="Сетевая форма реализации" />
        <KForms type="input" :content="[]" header="Совместно с" />
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.o4 {
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
