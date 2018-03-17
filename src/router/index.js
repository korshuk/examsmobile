import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'

import HomeView from '@/components/Home'
import SearchView from '@/components/Search'
import TableView from '@/components/Table'

Vue.use(VueAxios, axios)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/search',
      name: 'Search',
      component: SearchView
    },
    {
      path: '/table',
      name: 'Table',
      component: TableView
    }
  ]
})
