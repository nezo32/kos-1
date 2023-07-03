<script setup lang="ts">
import TF1 from '@/components/edit/description/O2TableForms/TF1.vue'
import TF2 from '@/components/edit/description/O2TableForms/TF2.vue'
import { KForms } from '@kosygin-rsu/components'
</script>

<template>
  <div class="o2">
    <section>
      <KForms
        type="multi"
        header="Общее описание профессиональной деятельности выпускников"
        :content="[]"
      />
    </section>
    <section>
      <KForms
        type="multi"
        header="Выпускники готовятся к решению задач профессиональной деятельности следующих типов"
        :content="[]"
      />
    </section>
    <section>
      <KForms
        type="multi"
        header="Перечень основных объектов (или областей знаний) профессиональной деятельности выпускников"
        :content="[]"
      />
    </section>
    <section>
      <TF1 />
    </section>
    <section>
      <TF2 />
    </section>
  </div>
</template>

<style scoped lang="scss">
.o2 {
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
