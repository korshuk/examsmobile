<template>
    <v-card flat>
        <v-container fill-height fluid>
        <v-layout fill-height>
            <v-flex xs12 align-end flexbox>
                Профиль: {{ pupil.profile }}
            <br/>
            Телефон: {{ pupil.phone }}
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
  export default {
    name: 'pupil-table-expand',
    props: ['pupil'],

    methods: {
      toggleEdit () {
        this.$emit('toggleEdit', this.pupil)
      }
    }

  }
</script>
