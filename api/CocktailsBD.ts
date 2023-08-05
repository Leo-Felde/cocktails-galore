import createAPI from './index'
import { AxiosResponse } from 'axios'

const baseURL = 'https://www.thecocktaildb.com/api/json/v1/1/'
const api = createAPI(baseURL)

interface Drink {
  name: string
  description: string
}

interface DrinkAPI {
  getById(name: string): Promise<AxiosResponse<Drink[]>>
  searchByName(name: string): Promise<AxiosResponse<Drink[]>>
  searchByCategory(category: string): Promise<AxiosResponse<Drink[]>>
  getRandomCocktail(): Promise<AxiosResponse<Drink[]>>
}

const methods: DrinkAPI = {
  getById(id: string) {
    return api.get<Drink[]>(`lookup.php?i=${id}`)
  },

  searchByName(name: string) {
    return api.get<Drink[]>(`search.php?s=${name}`)
  },

  searchByCategory(category: string) {
    return api.get<Drink[]>(`filter.php?c=${category}`)
  },

  async getRandomCocktail() {
      return api.get<Drink[]>(`random.php`)
  },
}

export default methods
