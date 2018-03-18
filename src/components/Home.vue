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
              <v-flex>
                <h4>{{ props.item.name }} - <span class="headline">{{ props.item.count }}</span></h4>
              </v-flex>
              <v-flex>
              </v-flex>
               <v-flex>
                  <v-btn icon
                         :href="`#/table?corps=${props.item.alias}`">
                    <v-icon>list</v-icon>
                  </v-btn>
               </v-flex>
            </v-card-title>  
            <v-list>
              <v-list-tile v-if="props.item.places.length === 1" >
                <v-list-tile-content>
                    <v-list-tile-title>
                      Профиль: 
                      <b v-for="place in props.item.places" :key="place._id">
                        {{ place.code}}
                      </b>
                    </v-list-tile-title>
                  </v-list-tile-content>
              </v-list-tile>
              
              <v-list-group v-if="props.item.places.length > 1" 
                v-model="props.item.active"
              >
                <v-list-tile slot="activator">
                  <v-list-tile-content>
                    <v-list-tile-title>
                      Профили: 
                      <b v-for="(place, index) in props.item.places" :key="place._id">
                        {{ place.code}}
                        <span v-if="index !== props.item.places.length - 1">, </span>
                      </b>
                    </v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                
                <v-list-tile v-for="place in props.item.places" :key="place._id">
                  <v-list-tile-content>
                    <v-list-tile-title>
                      {{ place.code }} 
                      <span class="grey--text text--darken-2">
                        ({{ place.count }})
                      </span>
                    </v-list-tile-title>
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
  import apiService from '@/services/apiService'
  
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
        this.loading = true

        apiService.getCorpses()
          .then(this.onSuccess)
          .catch(this.onError)
          .finally(this.loadingEnd)
      },

      onSuccess (response) {
        this.items = response.data
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

<style scoped>
  h4 {
    text-transform: uppercase;
  }
</style>

