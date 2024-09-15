import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface IFilters {
  stars: number
  languages: Array<string>
  created: Array<string>
}

export interface IHomePageStore {
  searchFilters: IFilters
  setSearchFilters: (filters: IFilters) => void
}

export const useHomePageStore = defineStore('HomePage', () => {
  const searchFilters = ref<IFilters>({ stars: 0, languages: [], created: [] })

  const setSearchFilters = (filterString: IFilters) => {
    searchFilters.value = { ...filterString }
  }

  return {
    searchFilters,
    setSearchFilters
  }
})
