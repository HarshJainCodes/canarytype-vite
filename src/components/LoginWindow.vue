<template>
  <v-sheet class="py-10 px-10 mx-auto rounded-xl" height="100%" rounded>
    <div class="px-10 py-10">
      <div>
        <div class="text-h5">Login</div>

        <v-text-field class="pt-10" label="User Name" v-model="userName"> </v-text-field>

        <v-text-field label="Password" type="password" v-model="password"> </v-text-field>
      </div>

      <v-btn width="100%" @click="login"> LOGIN </v-btn>
    </div>
  </v-sheet>
</template>

<script>
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import { useUserStore } from '../stores/userStore'

export default {
  setup() {
    const userName = ref('')
    const password = ref('')

    const userStore = useUserStore()

    const toast = useToast()

    const login = async () => {
      const res = await fetch('https://canarytype.azurewebsites.net/api/Login', {
        method: 'POST',
        body: JSON.stringify({
          userName: userName.value,
          password: password.value
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })

      // const apiRes = await res.json()
      // if (res.status === 200) {
      //     const token = apiRes.token
      //     localStorage.setItem('canaryLoginToken', token)
      //     toast('Logged in successfully', {
      //         type: 'success'
      //     })
      // } else if (res.status === 401) {
      //     console.log('Incorrect username or password')
      //     toast('Incorrect Username and password', {
      //         type: 'error',
      //     })
      // }

      if (res.status === 404) {
        toast('Invalid Username or Password', {
          type: 'error'
        })
      } else if (res.status === 200) {
        // logged in successfully
        const apiRes = await res.json()
        const token = apiRes.token

        localStorage.setItem('canaryLoginToken', token)
        localStorage.setItem('canaryUserName', userName.value)

        userStore.userName = userName
        userStore.isLoggedIn = true
        userStore.requireLogin = false

        toast('Logged in Successfully', {
          type: 'success'
        })
      }
    }

    return {
      userName,
      password,
      login
    }
  }
}
</script>
