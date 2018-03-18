import Vue from 'vue'
import CONSTANTS from '@/constants/constants'

export default {
  search (search) {
    return Vue.axios.get(CONSTANTS.BASE_URL + 'search', { params: { search } })
  },
  getPupils (params) {
    return Vue.axios.get(CONSTANTS.BASE_URL + 'pupils', { params: params })
  },
  getDictionary () {
    return Vue.axios.get(CONSTANTS.BASE_URL + 'dictionary')
  },
  getCorpses () {
    return Vue.axios.get(CONSTANTS.BASE_URL + 'corpses')
  },
  getCorps (corpsAlias) {
    return Vue.axios.get(CONSTANTS.BASE_URL + 'corpses/' + corpsAlias)
  }
}
