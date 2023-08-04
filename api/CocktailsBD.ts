import createAPI from './index'
import { AxiosResponse } from 'axios'

const baseURL = 'https://www.thecocktaildb.com/api/json/v1/1/'
const api = createAPI(baseURL)

interface Drink {
  name: string
  description: string
}

interface DrinkAPI {
  searchByName(name: string): Promise<AxiosResponse<Drink[]>>
  searchByCategory(category: string): Promise<AxiosResponse<Drink[]>>
  getAllAsc(): Promise<AxiosResponse<Drink[]>>
  getRandomCocktail(): Promise<AxiosResponse<Drink[]>>
}

const methods: DrinkAPI = {
  searchByName(name: string) {
    return api.get<Drink[]>(`search.php?s=${name}`)
},

  searchByCategory(category: string) {
    return api.get<Drink[]>(`filter.php?c=${category}`)
  },

  async getAllAsc() {
    return api.get<Drink[]>(`search.php?f=a`)
  },

  async getRandomCocktail() {
      return api.get<Drink[]>(`random.php`)
  },
}

export default methods
