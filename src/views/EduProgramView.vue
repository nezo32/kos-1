<script setup lang="ts">
import { usePermissionStore } from '@/stores'
import OperatorEduProgram from '@/components/views/OperatorEduProgram.vue'
import DepLeadEduProgram from '@/components/views/DepLeadEduProgram.vue'

const store = usePermissionStore()
</script>

<template>
  <div>
    <OperatorEduProgram v-if="store.permission != 'Заведующий кафедры'" />
    <DepLeadEduProgram v-else />
  </div>
</template>

<style scoped lang="scss"></style>
