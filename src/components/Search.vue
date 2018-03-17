<template>
    <v-container grid-list-md transition="slide-y-transition">
        <v-layout row align-center>
          <v-flex xs12>
            <v-text-field
              name="nameSearch"
              label="Поиск..."
              single-line
              v-model="search"
              append-icon="search"
              ></v-text-field>
          </v-flex>
        </v-layout>
        <loading-indicator v-bind:loading="loading"></loading-indicator>
        <v-layout row align-center>
          <v-flex xs12>
              <v-data-table
                  :headers="headers"
                  :items="items"
                  hide-actions
                  loading="true"
                  no-data-text="Ничего не найдено"
                  class="elevation-1"
              >
                  <template slot="items" slot-scope="props">
                      <td v-html="getFIO(props.item)"></td>
                      <td>
                        {{ props.item.profile }}
                        <br/>
                        {{ props.item.place }}
                        <br/>
                        {{ props.item.audience }}
                      </td>
                      <td>
                        {{ props.item.phone }}
                        <br/>
                        {{ props.item.email }}
                      </td>
                  </template>
              </v-data-table>
          </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  export default {
    data () {
      return {
        search: '',
        loading: false,
        headers: [
          {
            text: 'ФИО',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: '',
            sortable: false
          },
          { text: 'Контакты',
            sortable: false
          }
        ],
        items: []
      }
    },

    watch: {
      search (after, before) {
        this.fetch()
      }
    },

    methods: {
      fetch () {
        const self = this

        self.loading = true
        self.axios
          .get('http://localhost:5000/api/search', { params: { search: self.search } })
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
      },

      highlight (text) {
        return text.replace(new RegExp(this.search, 'gi'), '<b>$&</b>')
      },

      getFIO (item) {
        const firstName = this.highlight(item.firstName)
        return `${firstName} ${item.lastName} ${item.parentName}`
      }
    }
  }
</script>