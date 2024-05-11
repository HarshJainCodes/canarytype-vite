<template>
  <v-sheet class="py-10 px-10 mx-auto rounded-xl" height="100%" rounded>
    <div class="px-10 py-10">
      <div>
        <div class="text-h5">Register</div>

        <v-text-field class="pt-10" label="User Name" v-model="userName"> </v-text-field>

        <v-text-field label="Password" type="password" v-model="password"> </v-text-field>
      </div>

      <v-btn width="100%" @click="registerNewUser"> LOGIN </v-btn>
    </div>
  </v-sheet>
</template>

<script>
import { ref } from 'vue'
import { useUserStore } from '../stores/userStore'
import { useToast } from 'vue-toastification'

export default {
  setup() {
    const userName = ref('')
    const password = ref('')

    const userStore = useUserStore()
    const toast = useToast()

    const registerNewUser = async () => {
      const response = await fetch(
        'https://canarytype.azurewebsites.net//api/Login/RegisterNewUser',
        {
          method: 'POST',
          body: JSON.stringify({
            userName: userName.value,
            password: password.value
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8'
          }
        }
      )
      const serverRes = await response.json()

      if (response.status === 409) {
        userStore.isLoggedIn = false
        toast('User Already Exists', {
          type: 'error'
        })
      } else if (response.status === 200) {
        userStore.isLoggedIn = true
        userStore.userName = serverRes.userName
        userStore.requireLogin = false

        localStorage.setItem('canaryLoginToken', serverRes.token)
        localStorage.setItem('canaryUserName', serverRes.userName)
      }
    }

    return {
      userName,
      password,
      registerNewUser
    }
  }
}
</script>
