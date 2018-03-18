import Vue from 'vue'

import App from './App'
import router from './router'
import Vuetify from 'vuetify'

import CONSTANTS from '@/constants/constants'

import ApiService from '@/services/apiService'
import DictionaryService from '@/services/dictionaryService'

import LoadingIndicator from '@/components/LoadingIndicator'
import PupilTableRow from '@/components/pupilTableRow'
import PupilTableExpand from '@/components/pupilTableExpand'

import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)
Vue.use(ApiService)
Vue.use(DictionaryService)

Vue.component('loading-indicator', LoadingIndicator)
Vue.component('pupil-table-row', PupilTableRow)
Vue.component('pupil-table-expand', PupilTableExpand)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>',
  CONSTANTS: CONSTANTS
})
