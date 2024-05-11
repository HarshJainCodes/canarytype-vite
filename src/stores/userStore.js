import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    requireLogin: false,
    userName: '',
    isLoggedIn: false
  })
})
