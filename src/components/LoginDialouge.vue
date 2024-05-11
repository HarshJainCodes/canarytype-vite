<template>
  <v-sheet rounded>
    <v-tabs v-model:model-value="tabIndex" align-tabs="center">
      <v-tab> LOGIN </v-tab>

      <v-tab> REGISTER </v-tab>
    </v-tabs>

    <v-window v-model="tabIndex">
      <v-window-item>
        <login-window></login-window>
      </v-window-item>

      <v-window-item>
        <register-window></register-window>
      </v-window-item>
    </v-window>
  </v-sheet>
</template>

<script>
import { ref } from 'vue'
import LoginWindow from './LoginWindow.vue'
import RegisterWindow from './RegisterWindow.vue'

export default {
  components: {
    LoginWindow,
    RegisterWindow
  },
  setup() {
    const tabIndex = ref(0)

    return {
      tabIndex
    }
  }
}
</script>
