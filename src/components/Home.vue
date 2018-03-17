<template>
  <v-container fluid grid-list-md>
    <loading-indicator v-bind:loading="loading"></loading-indicator>

      <v-data-iterator
        content-tag="v-layout"
        row wrap justify-center
        :items="items"
        :total-items="100"
        hide-actions
      >
        <v-flex
          slot="item"
          slot-scope="props"
          xs11
        >
          <v-card>
            <v-card-title>
              <v-flex xs6>
                <h4>{{ props.item.name }}</h4>
              </v-flex>
              <v-flex xs4>
                <h3 class="headline">{{ props.item.count }} / {{ props.item.max }}</h3>
              </v-flex>
               <v-flex xs2>
                  <v-btn icon ripple :href="`#/table?corps=${props.item.alias}`">
                    <v-icon>list</v-icon>
                  </v-btn>
               </v-flex>
            </v-card-title>         
            <v-list>
              <v-list-group
                v-model="props.item.active"
              >
                <v-list-tile slot="activator">
                  <v-list-tile-content>
                    <v-list-tile-title>
                      Всего - {{ props.item.count }}
                    </v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                
                <v-list-tile v-for="place in props.item.places" :key="place._id">
                  <v-list-tile-content>
                    <v-list-tile-title>
                      {{ place.code }}
                    </v-list-tile-title>
                    <v-list-tile-sub-title>
                      {{ place.count }} / {{place.max}}
                    </v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-btn icon ripple :href="`#/table?corps=${props.item.alias}&place=${place._id}`">
                      <v-icon>list</v-icon>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>
              </v-list-group>
            </v-list>
            
            <v-card-actions>
              <v-container grid-list-md text-xs-center>
                <v-layout row wrap justify-space-between>
                  
                  
                    <v-btn flat icon ripple color="indigo">
                      <v-badge bottom color="red">
                    <span slot="badge">12</span>
                      <v-icon>star</v-icon>
                                        </v-badge>

                    </v-btn>

                 
                    <v-btn flat icon ripple color="orange">
                      <v-badge bottom color="red">
                    <span slot="badge">12</span>
                      <v-icon>cached</v-icon>
                                        </v-badge>

                    </v-btn>


                    <v-btn flat icon ripple color="purple">
                      <v-badge bottom color="red">
                    <span slot="badge">12</span>
                      <v-icon>star</v-icon>
                                        </v-badge>

                    </v-btn>


                    <v-btn flat icon ripple color="light-blue">
                      <v-badge bottom color="red">
                    <span slot="badge">12</span>
                      <v-icon>cached</v-icon>
                                        </v-badge>

                    </v-btn>

                  
                    <v-btn flat icon ripple color="teal">
                      <v-badge bottom color="red">
                    <span slot="badge">12</span>
                      <v-icon>star</v-icon>
                                        </v-badge>

                    </v-btn>

                 
                    <v-btn flat icon ripple color="deep-orange">
                       <v-badge bottom color="red">
                        <span slot="badge">12</span>
                        <v-icon>cached</v-icon>
                      </v-badge>
                    </v-btn>
                  
                </v-layout>
              </v-container>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-data-iterator>
  </v-container>
</template>


<script>
  export default {
    data () {
      return {
        loading: false,
        items: []
      }
    },

    created () {
      this.fetch()
    },

    methods: {
      fetch () {
        const self = this

        self.loading = true
        self.axios
          .get('http://localhost:5000/api/corpses')
          .then(onSuccess)
          .catch(onError)

        function onSuccess (response) {
          self.loading = false
          self.items = response.data
        }

        function onError (error) {
          console.log(error)
          self.loading = false
        }
      }
    }
  }
</script>

<style scoped>
  h4 {
    text-transform: uppercase;
  }
</style>

