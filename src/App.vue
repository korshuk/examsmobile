<template>
  <v-app>
    <v-navigation-drawer
      fixed
      temporary
      v-model="drawer"
      app
    >
      <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">
              Список Корпусов
            </v-list-tile-title>
        </v-list-tile>
      </v-list>
      </v-toolbar>
     <v-divider></v-divider>
      <v-list
        three-line
        dense
        class="grey lighten-4"
      >
        <span v-for="(corps) in corpses" v-bind:key="corps.alias" >
          <v-list-tile 
            :href="`#/table/${corps.alias}/all`">
            <v-list-tile-content>
              <v-list-tile-title>
                {{ corps.name }}                
              </v-list-tile-title>
              <v-list-tile-sub-title v-for="(place) in corps.places" v-bind:key="place._id">
                  {{place.code}} ({{place.count}})
              </v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon ripple>
                <v-icon color="grey lighten-1">arrow_forward_ios</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider v-bind:key="corps.alias"></v-divider>
        </span>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app class="indigo lighten-1 white--text">
      
      
      <v-btn icon ripple v-if="isSearch" @click="goBack()" class="mx-3 white--text">
        <v-icon>chevron_left</v-icon>
      </v-btn>

      <v-toolbar-side-icon @click.stop="drawer = !drawer" class="white--text"></v-toolbar-side-icon>

      <v-toolbar-title>{{DICTIONARY.corpses && DICTIONARY.corpses[title]}}</v-toolbar-title>
      <v-spacer></v-spacer>
      
      <v-btn icon ripple v-if="isTable" href="#/search" class="mx-3 white--text">
        <v-icon>search</v-icon>
      </v-btn>
    </v-toolbar>
  
    <v-content v-scroll="onScroll">   
      <loading-indicator v-bind:loading="loading"></loading-indicator>

      <v-scale-transition name="fade">
        <router-view/>
      </v-scale-transition>

      <v-fab-transition>
        <v-btn
          v-if="offsetTop > 50"
          :color="'purple'" dark
          fab
          fixed bottom right
          @click="scrollToTop"
        >
          <v-icon>keyboard_arrow_up</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-content>
    
    <v-footer app class="pa-3">
      
      <div>&copy; {{ new Date().getFullYear() }}</div>
      <v-spacer></v-spacer>
    </v-footer>
  </v-app>
</template>

<script>
import Preloader from '@/plugins/preloader/Preloader'
import apiService from '@/services/apiService'
import dictionaryService from '@/services/dictionaryService'

export default {
  data () {
    return {
      drawer: this.$route.name === 'Home',
      loading: true,
      corpses: [],
      isSearch: this.$route.name === 'Search',
      isTable: this.$route.name === 'TableCorpsPlace',
      notHome: this.$route.name !== 'Home',
      title: '',
      DICTIONARY: {},
      offsetTop: 0
    }
  },
  name: 'App',

  created () {
    if (this.isTable) {
      this.title = this.$route.params.corpsAlias
    } else {
      this.title = ''
    }

    apiService.getCorpses()
          .then(this.onSuccess)
          .catch(this.onError)
          .finally(this.loadingEnd)
  },

  watch: {
    '$route' (to, from) {
      this.isSearch = this.$route.name === 'Search'
      this.notHome = this.$route.name !== 'Home'
      this.isTable = this.$route.name === 'TableCorpsPlace'
      if (this.isTable) {
        this.title = this.$route.params.corpsAlias
      } else {
        this.title = ''
      }
    }
  },

  methods: {
    goBack () {
      if (this.$route.name !== 'TableCorpsPlace') {
        window.history.length > 1
          ? this.$router.go(-1)
          : this.$router.push('/')
      } else {
        this.$router.push('/')
      }
    },

    onScroll (e) {
      this.offsetTop = window.pageYOffset || document.documentElement.scrollTop
    },

    scrollToTop () {
      return document.documentElement.scroll({
        top: 0,
        behavior: 'smooth'
      })
    },

    onSuccess (response) {
      this.corpses = response.data
      this.DICTIONARY = dictionaryService.getters.DICTIONARY()

      setTimeout(function () {
        Preloader.onLoaded()
      }, 6000)
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
