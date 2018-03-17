<template>
  <v-app>
    
    <v-toolbar
      app
      :clipped-left="false"
    >
      <v-btn icon ripple href="#/" v-if="notHome">
        <v-icon>chevron_left</v-icon>
      </v-btn>

      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      
      <v-btn icon ripple href="#/search">
        <v-icon>search</v-icon>
      </v-btn>
    
    </v-toolbar>
  
    <v-content>        
      <v-scale-transition name="fade">
        <router-view/>
      </v-scale-transition>
    </v-content>
  
    <v-footer app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      notHome: this.$route.name !== 'Home',
      title: 'Vuetify.js'
    }
  },
  name: 'App',

  watch: {
    '$route' (to, from) {
      this.notHome = this.$route.name !== 'Home'
    }
  }
}
</script>
