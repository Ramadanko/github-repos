<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { useRepoCard } from '@/modules/HomePage/RepoCard/useRepoCard'
import { VList } from 'vuetify/components'

const TARGET_HEIGHT = 200
const { stars, createdAt, language } = defineProps({
  stars: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Array<string>,
    default: []
  },
  language: {
    type: String,
    default: '',
    required: true
  }
})

const page = ref(1)
const savedQuery = ref('')
const itemsListElement = ref<typeof VList>()
const q = computed<string>(() => {
  let query = `?q=stars:>${stars}`
  query += `+language:${language}`
  if (createdAt.length > 1) {
    query += `+created:${createdAt[0]}..${createdAt[1]}`
  }
  return query
})

const { items, error, isLoading, noResult, resetError, resetAll, loadGithubRepos } = useRepoCard()

const atScrollEnd = (e: Event) => {
  const element = e.target as HTMLElement
  const isBeforeEnd = element.scrollTop + element.clientHeight > element.scrollHeight - TARGET_HEIGHT
  if (isBeforeEnd && !isLoading.value) {
    page.value += 1
    loadGithubRepos({ q: savedQuery.value, page: page.value })
  }
}

watchEffect(async () => {
  if (q.value !== savedQuery.value) {
    page.value = 1
    savedQuery.value = q.value
    resetAll()
    await loadGithubRepos({ q: savedQuery.value, page: page.value, appendData: false })
    if (itemsListElement?.value?.$el) {
      itemsListElement.value?.$el.scroll({ top: 0 })
    }
  }
})
</script>
<template>
  <v-sheet border rounded elevation="1" class="d-flex flex-column position-relative" height="400">
    <v-progress-linear v-if="isLoading" absolute top indeterminate color="primary" />
    <v-card-title>{{ language }}</v-card-title>
    <v-divider />
    <v-sheet v-if="noResult" class="d-flex flex-grow-1 flex-column justify-center pa-4">
      <v-alert :text="noResult" variant="outlined" type="info" class="flex-0-0" />
    </v-sheet>
    <v-list
      v-if="items.length"
      lines="three"
      @scrollend="atScrollEnd"
      class="scrollable-list flex-grow-1"
      ref="itemsListElement">
      <v-list-item v-for="repo in items" :key="repo.id">
        <v-list-item-title>
          <a target="_blank" :href="repo.html_url">{{ repo.name }}</a>
        </v-list-item-title>
        <v-list-item-subtitle>{{ repo.description }}</v-list-item-subtitle>
        <v-list-item-subtitle>
          <span class="text-subtitle-2">Created at:</span> {{ repo.created_at }}
        </v-list-item-subtitle>
        <v-list-item-subtitle>
          <span class="text-subtitle-2">Stars:</span> {{ repo.stargazers_count }}
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>
    <v-card-actions v-if="error">
      <v-alert :text="error" type="error" variant="tonal" closable @click:close="resetError" />
    </v-card-actions>
  </v-sheet>
</template>
