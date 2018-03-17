// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import App from './App'
import router from './router'
import Vuetify from 'vuetify'

import LoadingIndicator from '@/components/LoadingIndicator'

import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

Vue.component('loading-indicator', LoadingIndicator)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
