<script setup lang="ts">
import { useHomePageStore } from '@/modules/HomePage/HomePageStore'
import { storeToRefs } from 'pinia'
import RepoCard from '@/modules/HomePage/RepoCard/RepoCard.vue'

const homePageStore = useHomePageStore()
const { searchFilters } = storeToRefs(homePageStore)
</script>

<template>
  <h3 v-if="searchFilters.languages.length">
    Github repositories
    <span v-if="searchFilters.created.length">
      between {{ searchFilters.created[0] }} and {{ searchFilters.created[1] }}
    </span>
    with at least {{ searchFilters.stars }} stars
  </h3>
  <v-container>
    <v-row>
      <v-col v-for="language in searchFilters.languages" :key="language" md="4" sm="6" xs="12">
        <RepoCard :language="language" :stars="searchFilters.stars" :created-at="searchFilters.created" />
      </v-col>
    </v-row>
  </v-container>
</template>
