<script setup lang="ts">
import { computed, onUpdated, ref, watch } from "vue";
import { useRoute, type RouteLocationMatched, useRouter } from "vue-router";
import { useUserStore } from "@/stores";
import { KServiceHeader } from "@kosygin-rsu/components";
import { storeToRefs } from "pinia";

const route = useRoute();
const router = useRouter();
const store = useUserStore();

const { authed, permission, username } = storeToRefs(store);

watch(username, (n) => {
  name.value = n ?? "Не авторизован";
});

const notificationPath = ref("https://example.com");
const name = ref(store.username ?? "Не авторизован");
const pfpUrl = ref("/images/placeholder.png");
const availablePermissions = ref([
  { name: "Оператор" },
  { name: "Руководитель ООП", default: true },
  { name: "Заведующий кафедры" },
  { name: "Преподаватель" }
]);

const title = ref<string>();
const breadcrumbs = computed(() =>
  route.matched.map((el) => ({ name: el.meta.breadcrumbs as string, path: pathChecker(el) })).filter((el) => el.name)
);

function pathChecker(thisRoute: RouteLocationMatched): string {
  if (!thisRoute.path.includes(":id")) return thisRoute.path;
  return thisRoute.path.replace(":id", route.params.id as string);
}

watch(route, async () => {
  title.value = route.meta.name ? await (route.meta.name as any)(route) : (route.meta.breadcrumbs as string);
});
</script>

<template>
  <KServiceHeader
    @link-click="(link) => router.push(link)"
    class="sh"
    v-model="store.permission"
    :path="breadcrumbs"
    :notification-path="notificationPath"
    :title="title || 'Placeholder'"
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
