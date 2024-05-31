<template>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header> -->

  <v-app>
    <v-app-bar class="px-3" density="compact" flat>
      <v-spacer></v-spacer>
      <v-tabs @update:model-value="onChangeTab($event)">
        <v-tab v-for="link in links" :key="link"> {{ link }} </v-tab>
      </v-tabs>
      <v-spacer></v-spacer>

      <v-btn
        v-if="!userStore.isLoggedIn"
        data-qa-id="loginBtn"
        color="green"
        variant="outlined"
        position="absolute"
        location="right"
        @click="userStore.requireLogin = true"
      >
        LOGIN
      </v-btn>
      <div v-else>
        <v-menu>
          <template #activator="{ props }">
            <v-btn
              data-qa-id="login-button-after-login"
              v-bind="props"
              color="teal-darken-3"
              variant="tonal"
              position="absolute"
              location="right"
            >
              {{ userStore.userName }}
            </v-btn>
          </template>

          <v-list class="mx-0" data-qa-id="login-menu-list">
            <v-list-item class="w-100 px-0">
              <v-btn class="w-100 px-0" @click="logOut"> LOG OUT </v-btn>
            </v-list-item>

            <v-list-item class="w-100 px-0">
              <v-btn class="w-100 px-0"> PROFILE </v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>

    <v-main class="w-100">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component"></component>
        </keep-alive>
      </router-view>

      <v-dialog data-qa-id="login-dialouge" v-model="userStore.requireLogin" width="30%">
        <login-dialog data-qa-id="login-dialouge-component" />
      </v-dialog>
    </v-main>
  </v-app>
</template>

<script>
import { RouterView, useRouter } from 'vue-router'
import { useUserStore } from './stores/userStore'

import LoginDialog from './components/LoginDialouge.vue'

export default {
  components: {
    RouterView,
    LoginDialog
  },
  setup() {
    const userStore = useUserStore()

    const links = ['Home', 'Leaderboard']

    const router = useRouter()

    const onChangeTab = (value) => {
      switch (value) {
        case 0:
          router.push('/')
          break
        case 1:
          router.push('/leaderboard')
      }
    }

    const logOut = () => {
      localStorage.removeItem('canaryLoginToken')
      localStorage.removeItem('canaryUserName')

      userStore.isLoggedIn = false
      userStore.userName = ''
    }

    return { userStore, links, onChangeTab, logOut }
  }
}
</script>
