import createAPI from './index'
import { AxiosResponse } from 'axios'

const baseURL = 'https://www.thecocktaildb.com/api/json/v1/1/'
const api = createAPI(baseURL)

interface DrinkApi {
  drinks: []
}

interface DrinkAPI {
  getById(name: string): Promise<AxiosResponse<DrinkApi[]>>
  searchByName(name: string): Promise<AxiosResponse<DrinkApi[]>>
  searchByCategory(category: string): Promise<AxiosResponse<DrinkApi[]>>
  getRandomCocktail(): Promise<AxiosResponse<DrinkApi[]>>
}

const methods: DrinkAPI = {
  getById(id: string) {
    return api.get<DrinkApi[]>(`lookup.php?i=${id}`)
  },

  searchByName(name: string) {
    return api.get<DrinkApi[]>(`search.php?s=${name}`)
  },

  searchByCategory(category: string) {
    return api.get<DrinkApi[]>(`filter.php?c=${category}`)
  },

  async getRandomCocktail() {
      return api.get<DrinkApi[]>(`random.php`)
  },
}

export default methods
