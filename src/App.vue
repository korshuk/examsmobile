<template>
  <v-app>
    
    <v-toolbar app scroll-off-screen class="indigo lighten-1 white--text">

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
export default {
  data () {
    return {
      notHome: this.$route.name !== 'Home',
      title: 'Лицей БГУ'
    }
  },
  name: 'App',

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
    }
  }
}
</script>
