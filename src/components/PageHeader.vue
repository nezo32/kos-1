<script setup lang="ts">
import { computed, nextTick, onMounted, onUpdated, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { usePermissionStore } from '@/stores'
import { KServiceHeader } from '@kosygin-rsu/components'

const route = useRoute()
const store = usePermissionStore()

const notificationPath = ref('https://example.com')
const name = ref('Огородов Дмитрий')
const pfpUrl = ref('/images/placeholder.png')
const availablePermissions = ref([
  { name: 'Оператор', default: true },
  { name: 'Руководитель ООП' },
  { name: 'Заведующий кафедры' },
  { name: 'Преподаватель' }
])

const currentPageName = computed(() => route.name?.toString() || 'Placeholder')
const breadcrumbs = computed(() =>
  route.matched
    .map((el) => ({ name: el.meta.breadcrumbs as string, path: el.path }))
    .filter((el) => el.name)
)
</script>

<template>
  <KServiceHeader
    v-model="store.permission"
    :path="breadcrumbs"
    :notification-path="notificationPath"
    :title="currentPageName"
    :name="name"
    :pfp="pfpUrl"
    :statuses="availablePermissions"
  />
</template>

<style scoped lang="scss"></style>
