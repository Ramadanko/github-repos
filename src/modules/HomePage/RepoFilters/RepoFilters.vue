<script setup lang="ts">
import { programmingLanguages } from './constant'
import { reactive } from 'vue'
import moment from 'moment'
import { useHomePageStore } from '@/modules/HomePage/HomePageStore'

const { setSearchFilters } = useHomePageStore()
const filters = reactive({
  stars: 0,
  languages: [],
  created: []
})

const onSubmit = () => {
  let created = []
  if (filters.created.length > 1) {
    created.push(moment(filters.created[0]).format('YYYY-MM-DD'))
    created.push(moment(filters.created[filters.created.length - 1]).format('YYYY-MM-DD'))
  }
  setSearchFilters({ ...filters, created })
}
</script>

<template>
  <v-container>
    <h3 class="text-h5 my-5">Filters</h3>
    <form novalidate @submit.prevent="onSubmit">
      <v-select
        chips
        multiple
        clearable
        closable-chips
        name="language"
        variant="outlined"
        density="comfortable"
        label="Select language(s)"
        persistent-hint
        hint="C, C++, TypeScript, etc.."
        :items="programmingLanguages"
        v-model="filters.languages" />
      <br />
      <v-date-input
        clearable
        name="created"
        prepend-icon=""
        multiple="range"
        variant="outlined"
        density="comfortable"
        validate-on="eager"
        v-model="filters.created"
        label="Date input" />
      <br />
      <v-number-input
        :min="0"
        name="stars"
        variant="outlined"
        v-model="filters.stars"
        control-variant="stacked"
        label="Number of stars" />
      <br />
      <v-btn type="submit" color="primary" :disabled="!filters.languages.length">Search</v-btn>
    </form>
  </v-container>
</template>
