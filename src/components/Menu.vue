<script setup lang="ts">
import { KVerticalMenu, KVerticalMenuButtons } from '@kosygin-rsu/components'
</script>

<template>
  <div>
    <KVerticalMenu>
      <KVerticalMenuButtons url="/" content="Программы" icon="home" />
      <KVerticalMenuButtons url="/op_supervisors" content="Руководители ОП" icon="management" />
      <KVerticalMenuButtons url="/exit" content="Выход" icon="exit" />
    </KVerticalMenu>
  </div>
</template>

<style scoped lang="scss"></style>
