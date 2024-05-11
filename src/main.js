import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import App from './App.vue'
import router from './router'

const vuetify = createVuetify({
  components,
  directives
})

const Toastoptions = {
  // You can set your default options here
}

const app = createApp(App)

app.use(createPinia())
app.use(vuetify)
app.use(Toast, Toastoptions)
app.use(router)

app.mount('#app')
