<template>
    <v-container grid-list-xs>
        <loading-indicator v-bind:loading="loading"></loading-indicator>
        
        <v-toolbar fixed 
                  scroll-off-screen
                  scroll-toolbar-off-screen
                  style="top: 56px;">
            <v-container fluid grid-list-md>  
              <v-layout row align-center>
                <v-flex xs12>
                  <v-text-field
                    name="nameSearch"
                    label="Поиск..."
                    single-line
                    v-model="search"
                    prepend-icon="search"
                    ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
        </v-toolbar>

        <v-layout row align-center style="margin-top: 56px;">
          <v-flex xs12>
              <v-data-table
                  :headers="headers"
                  :items="items"
                  item-key="_id"
                  hide-actions
                  :loading="loading"
                  no-data-text="Ничего не найдено"
              >
                  <v-progress-linear slot="progress" color="teal" indeterminate></v-progress-linear>
                  <template slot="items" slot-scope="props">
                    <pupil-table-row 
                      v-bind:props="props"
                      v-bind:searchQuery="search"
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
                        <v-flex xs12 sm6 md4>
                          {{editedItem.firstName}}
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
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
        search: '',
        loading: false,
        dialog: false,
        editedIndex: -1,
        editedItem: {},
        defaultItem: {},
        headers: CONSTANTS.TABLE_HEADERS,
        items: []
      }
    },

    watch: {
      search () {
        this.fetch()
      },
      dialog (val) {
        val || this.closeDialog()
      }
    },

    methods: {
      toggleExpand (props) {
        props.expanded = !props.expanded
      },

      editItemDialog (item) {
        this.editedIndex = this.items.indexOf(item)
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

      fetch () {
        const self = this

        self.loading = true

        apiService.search(self.search)
          .then(self.onSuccess)
          .catch(self.onError)
          .finally(self.loadingEnd)
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