import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import * as labsComponents from 'vuetify/labs/components'
import { createVuetify } from 'vuetify'
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'

import App from './App.vue'
import router from './router'

const vuetify = createVuetify({
  components: {
    ...components,
    ...labsComponents
  },
  directives
})
const app = createApp(App)
const queryClient = new QueryClient()

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(VueQueryPlugin, { queryClient, enableDevtoolsV6Plugin: true })
app.mount('#app')
