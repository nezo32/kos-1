<script setup lang="ts">
import { db } from "@/core";
import { useUserStore } from "@/stores";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const store = useUserStore();
const router = useRouter();

onMounted(async () => {
  store.authed = false;
  store.permission = undefined;
  store.username = undefined;
  await db.logout();
  await router.push("/");
});
</script>

<template>
  <div></div>
</template>

<style scoped lang="scss"></style>
