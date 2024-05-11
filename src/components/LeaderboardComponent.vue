<template>
  <v-card class="w-100 py-10 px-10 rounded-shaped fill-height d-flex flex-column">
    <div class="w-100 d-flex text-h4 text-teal-accent-4 justify-center">Leaderboard</div>

    <div class="w-100 mt-10 h-100">
      <ag-grid-vue
        v-if="!!leaderboard"
        :rowData="leaderboard"
        :columnDefs="colDefs"
        :autoSizeStrategy="autoSizeStrategy"
        class="w-100 h-100 ag-theme-quartz"
      />
    </div>
  </v-card>
</template>

<script>
import 'ag-grid-community/styles/ag-grid.css' // Mandatory CSS required by the grid
import 'ag-grid-community/styles/ag-theme-quartz.css' // Optional Theme applied to the grid
import { AgGridVue } from 'ag-grid-vue3' // Vue Data Grid Component

import { ref, onMounted } from 'vue'

export default {
  components: {
    AgGridVue
  },
  setup() {
    const leaderboard = ref([])

    // Column Definitions: Defines the columns to be displayed.
    const colDefs = ref([{ field: 'userName' }, { field: 'bestTypingSpeed' }])
    const autoSizeStrategy = {
      type: 'fitGridWidth'
    }

    const fetchLeaderboard = async () => {
      const leaderboardRes = await fetch(
        'https://canarytype.azurewebsites.net/api/Canary/Leaderboard',
        {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('canaryLoginToken')
          }
        }
      )

      if (leaderboardRes.status === 200) {
        leaderboard.value = await leaderboardRes.json()
      }
    }

    onMounted(() => {
      fetchLeaderboard()
    })

    return {
      colDefs,
      leaderboard,
      autoSizeStrategy
    }
  }
}
</script>
