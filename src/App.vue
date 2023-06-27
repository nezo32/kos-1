<script setup lang="ts">
import { KFooter } from '@kosygin-rsu/components'
import Menu from '@/components/Menu.vue'
import PageHeader from '@/components/PageHeader.vue'
</script>

<template>
  <div class="app">
    <div class="app__main viewpoint">
      <div class="app__main__menu">
        <Menu />
      </div>
      <div class="app__main__content">
        <PageHeader />
        <Suspense>
          <RouterView />
        </Suspense>
      </div>
    </div>
    <div class="app__footer">
      <KFooter />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/app.scss';
</style>
