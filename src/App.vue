<script setup lang="ts">
import RepoFilters from '@/modules/HomePage/RepoFilters/RepoFilters.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <v-app>
    <v-app-bar>
      <h1 class="text-h5">Github Repos</h1>
    </v-app-bar>
    <v-navigation-drawer width="400">
      <RepoFilters />
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>
