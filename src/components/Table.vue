<template>
    <v-container fluid grid-list-xs>
        <loading-indicator v-bind:loading="loading"></loading-indicator>

        <v-toolbar fixed 
                  scroll-off-screen
                  scroll-toolbar-off-screen
                  v-if="corps.name"
                  style="top: 56px;">
            <v-container fluid grid-list-md>  
              <v-layout row wrap>
                <v-flex xs4 v-if="corps.places">
                  <v-select
                    :items="corps.places"
                    v-model="selectedPlace"
                    :attach="true"
                    label="Select"
                    single-line
                    item-text="code"
                  ></v-select>
                </v-flex>
                <v-flex xs4>
                  <v-select
                    v-bind:items="selectedPlace.audience"
                    v-model="selectedAudience"
                    label="Select"
                    :attach="true"
                    single-line
                    item-text="`${data.item.name} + bel`"
                    item-value="_id"
                  >
                    <template slot="selection" slot-scope="data">
                      {{ data.item.name}}{{data.item.bel === true ? ' (бел)' : ''}}
                    </template>
                    <template slot="item" slot-scope="data">
                      {{ data.item.name}}{{data.item.bel === true ? ' (бел)' : ''}}
                    </template>
                  </v-select>
                </v-flex>
                <v-flex xs4 text-xs-right>
                  <p class="">
                  {{ corps.name }} 
                  </p>
                </v-flex>
              </v-layout>
            </v-container>
        </v-toolbar>
        
        
        <v-layout column align-center style="margin-top: 56px;">
          <v-flex xs12>
              <v-data-table
                  :headers="headers"
                  :items="pupils"
                  item-key="_id"
                  :search="selectedAudience"
                  hide-actions
                  :loading="loading"
                  no-data-text="Ничего не найдено"
              >
                  <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
                  <template slot="items" slot-scope="props">
                    <pupil-table-row 
                      v-bind:props="props"
                      v-on:toggleExpand="toggleExpand"
                    ></pupil-table-row>
                  </template>
                  <template slot="expand" slot-scope="props">
                    <pupil-table-expand 
                      v-bind:pupil="props.item"
                      v-on:toggleEdit="editItemDialog"
                    ></pupil-table-expand>
                  </template>
              </v-data-table>

              <v-dialog v-model="dialog" max-width="500px">
                <v-card>
                  <v-card-title>
                    <span class="headline"> Статус </span>
                  </v-card-title>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12>
                          {{ `${editedItem.firstName} ${editedItem.lastName} ${editedItem.parentName}`}}
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary">Primary</v-btn>
                    <v-btn color="blue darken-1" flat @click.native="closeDialog">Cancel</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
          </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  import apiService from '@/services/apiService'
  import CONSTANTS from '@/constants/constants'

  export default {
    data () {
      return {
        loading: true,
        dialog: false,
        editedIndex: -1,
        editedItem: {},
        defaultItem: {},
        corps: {},
        selectedPlace: {},
        selectedAudience: {},
        headers: CONSTANTS.TABLE_HEADERS,
        pupils: []
      }
    },

    created () {
      this.fetchCorps()
    },

    watch: {
      '$route' (to, from) {
        this.fetchCorps()
      },
      selectedPlace: function (value) {
        this.placeChanged(value._id)
      },
      dialog (val) {
        val || this.closeDialog()
      }
    },

    methods: {
      toggleExpand (props) {
        props.expanded = !props.expanded
      },

      placeChanged (placeId) {
        const query = {
          corps: this.$route.params.corpsAlias,
          place: placeId
        }

        this.selectedAudience = ''

        this.fetch(query)
      },

      editItemDialog (item) {
        this.editedIndex = this.pupils.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      closeDialog () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      fetch (params) {
        this.loading = true

        apiService.getPupils(params)
          .then(this.onPupilsSuccess)
          .catch(this.onError)
          .finally(this.loadingEnd)
      },

      fetchCorps () {
        const corpsAlias = this.$route.params.corpsAlias

        apiService
          .getCorps(corpsAlias)
          .then(this.onCorpsSuccess)
          .catch(this.onError)
      },

      onPupilsSuccess (response) {
        this.pupils = response.data
      },

      onCorpsSuccess (response) {
        const routPlace = this.$route.params.placeId || ''
        let i = 0
        let length = response.data.places.length
        let selectedPlaceIndex = 0
        let allAudience = []

        this.corps = Object.assign({}, response.data)

        if (length > 1) {
          this.corps.places.unshift(JSON.parse(JSON.stringify(CONSTANTS.NONE_PLACE)))
        }

        length = this.corps.places.length

        for (i; i < length; i++) {
          if (this.corps.places[i]._id === routPlace) {
            selectedPlaceIndex = i
          }

          allAudience = allAudience.concat(this.corps.places[i].audience)

          this.corps.places[i].audience.unshift(JSON.parse(JSON.stringify(CONSTANTS.NONE_AUDIENCE)))
        }

        if (length > 1) {
          this.corps.places[0].audience = this.corps.places[0].audience.concat(allAudience.sort(sortAudienceByName))
        }

        this.selectedPlace = this.corps.places[selectedPlaceIndex]
      },

      getFIO (item) {
        return `${item.firstName} ${item.lastName} ${item.parentName}`
      },

      loadingEnd () {
        this.loading = false
      },

      onError (error) {
        console.log(error)
      }
    }
  }

  function sortAudienceByName (a, b) {
    return a.name >= b.name
  }
</script>