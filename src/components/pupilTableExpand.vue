<template>
    <v-card flat>
        <v-container fill-height fluid>
        <v-layout fill-height>
            <v-flex xs12 align-end flexbox>
                Профиль: {{ DICTIONARY.profiles[pupil.profile] }}
            <br/>
            Телефон: <a :href="'tel://'+ getPhone(pupil.phone)">+{{ getPhone(pupil.phone) }}</a>
            <br/>
            email: {{ pupil.email }}
            </v-flex>
            <v-btn icon 
                    absolute
                    right
                    dark 
                    @click="toggleEdit"
                    color="pink">
                <v-icon dark>edit</v-icon>
            </v-btn>
        </v-layout>
        </v-container>
    </v-card>
</template>

<script>
  import dictionaryService from '@/services/dictionaryService'
  
  export default {
    name: 'pupil-table-expand',
    props: ['pupil'],
    data () {
      return {
        DICTIONARY: dictionaryService.getters.DICTIONARY()
      }
    },
    methods: {
      toggleEdit () {
        this.$emit('toggleEdit', this.pupil)
      },

      getPhone (phone) {
        const x = phone.replace(/\D/g, '').match(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/)

        return `${x[1]}-(${x[2]})-${x[3]}-${x[4]}-${x[5]} `
      }

    }

  }
</script>
