<script setup lang="ts">
import MainHome from '@/components/views/MainHome.vue'
import DepLeadHome from '@/components/views/DepLeadHome.vue'
import { usePermissionStore } from '@/stores'

const store = usePermissionStore()
</script>

<template>
  <div>
    <MainHome v-if="store.permission != 'Руководитель ООП'" />
    <DepLeadHome v-else />
  </div>
</template>

<style scoped lang="scss"></style>
