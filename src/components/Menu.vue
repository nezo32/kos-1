<script setup lang="ts">
import { usePermissionStore } from '@/stores'
import { KVerticalMenu, KVerticalMenuButtons } from '@kosygin-rsu/components'
import { reactive, computed, watch } from 'vue'
import { useRoute } from 'vue-router'

const active = reactive([false, false, false])

const route = useRoute()
const store = usePermissionStore()
const path = computed(() => route.fullPath)

function set(index: number) {
  active.forEach((_, i) => {
    if (i != index) active[i] = false
    else active[i] = true
  })
}

watch(path, (n) => {
  if (n.includes('programs')) {
    set(0)
    return
  }
  if (n.includes('op_supervisors')) {
    set(1)
    return
  }
  if (n.includes('exit')) {
    set(2)
    return
  }
  set(-1)
})
</script>

<template>
  <div>
    <KVerticalMenu>
      <KVerticalMenuButtons :active="active[0]" url="/" content="Программы" icon="home" />
      <KVerticalMenuButtons
        v-if="store.permission == 'Оператор'"
        :active="active[1]"
        url="/op_supervisors"
        content="Руководители ОП"
        icon="management"
      />
      <KVerticalMenuButtons :active="active[2]" url="/exit" content="Выход" icon="exit" />
    </KVerticalMenu>
  </div>
</template>

<style scoped lang="scss"></style>
