<script setup lang="ts">
import { ref } from 'vue'
import DocumentEditBase from './DocumentEditBase.vue'
import DescMain from './description/DescMain.vue'
import O1 from './description/O1.vue'
import O2 from './description/O2.vue'

const page = ref(1)
</script>

<template>
  <div class="description-oop">
    <DocumentEditBase
      v-model:currentPage="page"
      title="ОПОП"
      header="Основная профессиональная образовательная программа Высшего образования"
      :pages="7"
      dropdown
    >
      <DescMain v-if="page == 1" />
      <O1 v-if="page == 2" />
      <O2 v-if="page == 3" />
    </DocumentEditBase>
  </div>
</template>

<style scoped lang="scss"></style>
