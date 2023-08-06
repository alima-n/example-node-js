import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import VueCompositionApi from '@vue/composition-api'
import vuetify from './vuetify'

import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(VueCompositionApi)

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount('#app')
