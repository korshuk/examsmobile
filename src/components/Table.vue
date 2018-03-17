<template>
    <v-container fluid grid-list-md>
        <loading-indicator v-bind:loading="loading"></loading-indicator>
        <v-layout row wrap>
          <v-flex xs12>
            <h1 class="headline">{{ corps.name }}</h1>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs6 v-if="corps.alias">
            <v-select
              :items="corps.places"
              v-model="selectedPlace"
              label="Select"
              single-line
              combobox
              item-text="code"
              item-value="_id"
            ></v-select>
          </v-flex>
           <v-flex xs6>
            
          </v-flex>
        </v-layout>
        <v-layout column align-center>
          <v-flex xs12>
              <v-data-table
                  :headers="headers"
                  :items="items"
                  hide-actions
                  :loading="loading"
                  no-data-text="Ничего не найдено"
                  class="elevation-1"
              >
                  <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
                  <template slot="items" slot-scope="props">
                      <td>
                        <span v-html="getFIO(props.item)"></span>
                        <br/>
                        <span class="grey--text text--darken-2">
                        {{ props.item.phone }}
                        </span>
                        <br/>
                        <span class="grey--text text--darken-1">
                        {{ props.item.email }}  
                        </span>
                      </td>
                      <td>
                        <span v-if="dictionary.places">
                          {{ dictionary.audiences[props.item.audience].name }}
                          <br/>
                          <nobr class="grey--text text--darken-2">
                            {{ dictionary.places[props.item.place].code }} {{ dictionary.places[props.item.place].name }}
                          </nobr> 
                          
                        </span>
                      </td>
                  </template>
              </v-data-table>
          </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  const NONE_PLACE = {
    _id: '',
    code: 'All'
  }

  export default {
    data () {
      return {
        loading: false,
        corps: {},
        selectedPlace: '',
        dictionary: {}, // require('@/components/dataMaps.js'),
        headers: [
          {
            text: 'Абитуриент',
            align: 'left',
            value: 'firstName'
          },
          { text: 'Аудитория',
            value: 'audience'
          }
        ],
        items: []
      }
    },

    created () {
      this.fetch(this.$route.query)
      this.fetchCorps()
      this.fetchDictionary()
      this.routQuery = this.$route.query

      this.selectedPlace = ''
      if (this.routQuery.place) {
        this.selectedPlace = this.routQuery.place
      }
    },

    watch: {
      selectedPlace: function () {
        this.placeChanged()
      }
    },

    methods: {
      placeChanged () {
        console.log(this.selectedPlace)
        this.routQuery.place = this.selectedPlace._id
        this.fetch(this.routQuery)
      },

      fetch (params) {
        const self = this

        self.loading = true
        self.axios
          .get('http://localhost:5000/api/pupils', { params: params })
          .then(onSuccess)
          .catch(onError)

        function onSuccess (response) {
          self.loading = false
          self.items = response.data.sort(sortByAudience)
        }

        function onError (error) {
          console.log(error)
          self.loading = false
        }
      },

      fetchDictionary () {
        const self = this
        self.axios
          .get('http://localhost:5000/api/dicionary')
            .then(onSuccess)
            .catch(onError)

        function onSuccess (response) {
          self.dictionary = response.data
        }

        function onError (error) {
          console.log(error)
        }
      },

      fetchCorps () {
        const self = this
        const corpsAlias = this.$route.query.corps

        self.axios
          .get('http://localhost:5000/api/corpses/' + corpsAlias, { params: self.$route.query })
          .then(onSuccess)
          .catch(onError)

        function onSuccess (response) {
          self.corps = response.data
          if (self.corps.places.length > 1) {
            self.corps.places.unshift(NONE_PLACE)
          } else {
            self.selectedPlace = self.corps.places[0]._id
          }
        }

        function onError (error) {
          console.log(error)
        }
      },

      getFIO (item) {
        return `${item.firstName} ${item.lastName} ${item.parentName}`
      }
    }
  }

  function sortByAudience (a, b) {
    if (a.audience < b.audience) {
      return -1
    }
    if (a.audience > b.audience) {
      return 1
    }
    return 0
  }
</script>