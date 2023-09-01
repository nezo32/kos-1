<script setup lang="ts">
import { readMe } from "@directus/sdk";
import { db } from "@/core";
import { useUserStore } from "@/stores";
import { KCustomInput, KKIDButton } from "@kosygin-rsu/components";
import { useRouter } from "vue-router";
import { ref, watch } from "vue";

const router = useRouter();
const store = useUserStore();

const email = ref("");
const password = ref("");

const error = ref<string[]>();

async function enter() {
  try {
    const authData = await db.login(email.value, password.value, {});

    const user = await db.request(readMe());

    store.meId = user.id;
    store.username = user.last_name + " " + user.first_name;
    store.permission = "Руководитель ООП";
    store.authed = true;

    await router.push("/");
  } catch (err) {
    const data = err as { errors: { message: string }[] };
    error.value = data.errors.map((el) => el.message);
  }
}

watch([email, password], () => {
  error.value = [];
});
</script>

<template>
  <div class="auth">
    <p v-if="error && error.length" v-html="error?.join('<br />')"></p>

    <KCustomInput theme="Почта" v-model="email" />
    <KCustomInput theme="Пароль" v-model="password" />

    <KKIDButton general content="Войти" @click="enter()" />
  </div>
</template>

<style scoped lang="scss">
.auth {
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: var(--white, #fff);
  padding: 20px;
  border-radius: 20px;

  > p {
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;

    color: var(--rejected);
  }
}
</style>
