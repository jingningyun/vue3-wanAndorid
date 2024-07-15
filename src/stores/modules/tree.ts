import { defineStore } from 'pinia'

export const useTreeStore = defineStore('tree', () => {
  const name = ref()
  const children = ref([])

  return {
    name,
    children,
  }
}, {
  persist: true,
})
