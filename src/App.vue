<template>
  <v-app>
    
    <v-navigation-drawer
      fixed
      temporary
      v-model="drawer"
      app
    >
      <v-layout
        row
        align-center
      >
        <v-flex xs12>
          <v-subheader>
            Список Корпусов
          </v-subheader>
        </v-flex>
      </v-layout>
      <v-list
        dense
        class="grey lighten-4"
      >
        <template v-for="(corps) in corpses">
          <v-list-tile :key="corps.alias" :href="`#/table/${corps.alias}/all`">
            <v-list-tile-content>
              <v-list-tile-title>
                {{ corps.name }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app scroll-off-screen class="indigo lighten-1 white--text">
      <v-toolbar-side-icon @click.stop="drawer = !drawer" class="white--text"></v-toolbar-side-icon>
      
      <v-btn icon ripple href="#/" v-if="notHome" @click="goBack()" class="mx-3 white--text">
        <v-icon>chevron_left</v-icon>
      </v-btn>

      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      
      <v-btn icon ripple href="#/search" class="mx-3 white--text">
        <v-icon>search</v-icon>
      </v-btn>
    
    </v-toolbar>
  
    <v-content>   
      <loading-indicator v-bind:loading="loading"></loading-indicator>

      <v-scale-transition name="fade">
        <router-view/>
      </v-scale-transition>
    </v-content>
  
    <v-footer app class="pa-3">
      <v-spacer></v-spacer>
      <div>&copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>

<script>
import apiService from '@/services/apiService'

export default {
  data () {
    return {
      drawer: this.$route.name === 'Home',
      loading: true,
      corpses: [],
      notHome: this.$route.name !== 'Home',
      title: 'Лицей БГУ (экзамены)'
    }
  },
  name: 'App',

  created () {
    console.log('app.created')

    apiService.getCorpses()
          .then(this.onSuccess)
          .catch(this.onError)
          .finally(this.loadingEnd)
  },

  watch: {
    '$route' (to, from) {
      this.notHome = this.$route.name !== 'Home'
    }
  },

  methods: {
    goBack () {
      if (this.$route.name !== 'Table') {
        window.history.length > 1
          ? this.$router.go(-1)
          : this.$router.push('/')
      } else {
        this.$router.push('/')
      }
    },

    onSuccess (response) {
      this.corpses = response.data
    },

    onError (error) {
      console.log(error)
    },

    loadingEnd () {
      this.loading = false
    }
  }
}
</script>
