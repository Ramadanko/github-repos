import axios, { AxiosError } from 'axios'
import { ref } from 'vue'

export interface ISingleRepoMinimal {
  id: string | number
  name: string
  html_url: string
  description: string
  created_at: Date
  stargazers_count: number
}

export function useRepoCard() {
  const items = ref<Array<ISingleRepoMinimal>>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const noResult = ref<string | null>(null)
  const total_count = ref(0)

  const loadGithubRepos = async ({ q = '', page = 1, appendData = true }) => {
    if (total_count.value && items.value.length === total_count.value) return
    isLoading.value = true
    error.value = null
    noResult.value = null
    const URL = `https://api.github.com/search/repositories${q}&s=stars&o=desc&page=${page}`
    try {
      const { data } = await axios.get(URL)
      total_count.value = data.total_count
      if (!appendData) {
        items.value = data.items
      } else {
        items.value = [...items.value, ...data.items]
      }
      noResult.value = !items.value.length ? 'No result(s) match with selected filters' : ''
    } catch (e: any) {
      error.value = e?.response?.data?.message ? e?.response?.data?.message : 'Error loading github repos'
    } finally {
      isLoading.value = false
    }
  }

  const resetError = () => (error.value = null)
  const resetAll = () => {
    error.value = null
    noResult.value = ''
    total_count.value = 0
  }

  return {
    items,
    error,
    noResult,
    isLoading,
    resetError,
    resetAll,
    loadGithubRepos
  }
}
