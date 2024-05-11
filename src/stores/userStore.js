import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    requireLogin: false,
    userName: 'Default',
    isLoggedIn: false
  })
})
