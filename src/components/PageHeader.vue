<script setup lang="ts">
import { computed, onUpdated, ref } from 'vue'
import { useRoute, type RouteLocationMatched } from 'vue-router'
import { usePermissionStore } from '@/stores'
import { KServiceHeader } from '@kosygin-rsu/components'

const route = useRoute()
const store = usePermissionStore()

const notificationPath = ref('https://example.com')
const name = ref('Огородов Дмитрий')
const pfpUrl = ref('/images/placeholder.png')
const availablePermissions = ref([
  { name: 'Оператор' },
  { name: 'Руководитель ООП', default: true },
  { name: 'Заведующий кафедры' },
  { name: 'Преподаватель' }
])

const currentPageName = computed(() => (route.meta.breadcrumbs as string) || 'Placeholder')
const breadcrumbs = computed(() =>
  route.matched
    .map((el) => ({ name: el.meta.breadcrumbs as string, path: pathChecker(el) }))
    .filter((el) => el.name)
)

function pathChecker(thisRoute: RouteLocationMatched): string {
  if (!thisRoute.path.includes(':id')) return thisRoute.path
  return thisRoute.path.replace(':id', route.params.id as string)
}
</script>

<template>
  <KServiceHeader
    class="sh"
    v-model="store.permission"
    :path="breadcrumbs"
    :notification-path="notificationPath"
    :title="currentPageName"
    :name="name"
    :pfp="pfpUrl"
    :statuses="availablePermissions"
  />
</template>

<style lang="scss">
.sh {
  .profile__name-status {
    white-space: nowrap;
  }
}
</style>
