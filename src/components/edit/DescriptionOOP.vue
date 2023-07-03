<script setup lang="ts">
import { reactive, ref } from 'vue'
import DocumentEditBase from './DocumentEditBase.vue'
import DescMain from './description/DescMain.vue'
import O1 from './description/O1.vue'
import O2 from './description/O2.vue'
import O3 from './description/O3.vue'

const page = ref(1)

const headers = reactive([
  'Основная профессиональная образовательная программа Высшего образования',
  'О1.	Общая характеристика образовательной программы',
  'О2. Характеристика профессиональной деятельности выпускника',
  'О3. Планируемые результаты освоения образовательной программы',
  'О4.	Структура и содержание образовательной программы',
  'О7.	Ресурсное обеспечение образовательной программы',
  'О7.	Ресурсное обеспечение образовательной программы',
  'Электронные ресурсы университета'
])
</script>

<template>
  <div class="description-oop">
    <DocumentEditBase
      v-model:currentPage="page"
      title="ОПОП"
      :header="headers[page - 1]"
      :pages="7"
      dropdown
    >
      <DescMain v-if="page == 1" />
      <O1 v-if="page == 2" />
      <O2 v-if="page == 3" />
      <O3 v-if="page == 4" />
    </DocumentEditBase>
  </div>
</template>

<style scoped lang="scss"></style>
