<template>
    <tr  @click="toggleExpand">
        <td>
            <span v-html="getFIO()"></span>
        </td>
        <td>
            <span v-if="DICTIONARY.audiences[props.item.audience]">
                {{ DICTIONARY.audiences[props.item.audience].name }}
            </span>
                <br/>
            <span v-if="DICTIONARY.places[props.item.place]">    
                <nobr class="grey--text text--darken-2">
                {{ DICTIONARY.places[props.item.place].code }}
                </nobr> 
            </span>
        </td>
    </tr>

</template>

<script>
  import dictionaryService from '@/services/dictionaryService'

  export default {
    name: 'pupil-table-row',
    props: [
      'props',
      'searchQuery'
    ],
    data () {
      return {
        DICTIONARY: dictionaryService.getters.DICTIONARY()
      }
    },

    methods: {
      toggleExpand () {
        this.$emit('toggleExpand', this.props)
      },

      highlight (text) {
        return text.replace(new RegExp(this.searchQuery, 'gi'), '<b>$&</b>')
      },

      getFIO () {
        let firstName = this.props.item.firstName
        if (this.searchQuery) {
          firstName = this.highlight(this.props.item.firstName)
        }
        return `${firstName} ${this.props.item.lastName} ${this.props.item.parentName}`
      }
    }
  }
</script>
