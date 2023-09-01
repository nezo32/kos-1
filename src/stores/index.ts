import { ref } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore(
  "permissions",
  () => {
    const authed = ref(false);
    const permission = ref<string>();

    const username = ref<string>();

    const meId = ref<string>();

    return { permission, authed, username, meId };
  },
  { persist: true }
);
