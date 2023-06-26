<script setup lang="ts">
import { usePermissionStore } from '@/stores'
import OperatorEduProgram from '@/components/views/OperatorEduProgram.vue'

const store = usePermissionStore()
</script>

<template>
  <div>
    <OperatorEduProgram v-if="store.permission == 'Оператор'" />
  </div>
</template>

<style scoped lang="scss"></style>
