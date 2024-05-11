import { defineStore } from 'pinia'

export const useLeaderboardStore = defineStore('leaderboardStore', {
  state: () => ({
    fetchleaderboard: false
  })
})
