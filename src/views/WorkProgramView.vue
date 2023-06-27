<script setup lang="ts">
import { usePermissionStore } from '@/stores'
import OperatorWorkProgram from '@/components/views/OperatorWorkProgram.vue'

const store = usePermissionStore()
</script>

<template>
  <div>
    <OperatorWorkProgram v-if="store.permission == 'Оператор'" />
  </div>
</template>

<style scoped lang="scss"></style>
