import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePermissionStore = defineStore('permissions', () => {
  const permission = ref('')

  return { permission }
})
