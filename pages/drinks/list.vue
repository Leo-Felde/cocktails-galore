<template>
  <div>
    <v-btn
      text
      v-for="category in drinkCategories"
      :key="category.value"
      @click="getDrinksByCategory(category.value)"
    >
      {{  category.text }}
    </v-btn>
    
    <div class="d-flex">
      <v-row
        v-if="!loading && listedDrinks?.length > 0"
        class="mx-auto"
        justify="center"
      >
        <v-col
          v-for="drink in listedDrinks"
          :key="drink.idDrink"
          lg="2"
          md="3"
          xs="12"
          class="mt-4 mx-2"
        >
          <v-card
            class="mx-auto"
            max-width="300"
          >
            <v-card-title>
              {{ drink.strDrink }}
            </v-card-title>
            <v-card-text>
              <v-img
                :src="drink.strDrinkThumb"
                lazy-src="https://www.oncrawl.com/wp-content/uploads/2019/04/A-lazy-loading-primer-for-crawlability-indexing-success250px.png"
                aspect-ratio="1/1"
                class="mx-auto"
                width="250"
                />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <div v-else-if="loading">
        loading :D
      </div>
      <div v-else>
        Não encontrou nada
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import CocktailAPI from '~/api/CocktailsBD'

declare interface Drink {
    strDrink: string,
    strDrinkThumb: string,
    idDrink: string
  }

export default {
  setup () {
    const listedDrinks = ref(Array<Drink>)
    const loading = ref(false)

    const drinkCategories = ref([
      { text: 'Ordinary Drink', value: 'Ordinary_Drink' },
      { text: 'Cocktail', value: 'Cocktail' },
      { text: 'Shake', value: 'Shake' },
      { text: 'Cocoa', value: 'Cocoa' },
      { text: 'Ordinary', value: 'Shot' },
      { text: 'Coffee / Tea', value: 'Coffee_Tea' },
      { text: 'Homemade Liqueur', value: 'Homemade_Liqueur' },
      { text: 'Punch / Party Drink', value: 'Punch_Party_Drink' },
      { text: 'Beer', value: 'Beer' },
      { text: 'Soft Drink', value: 'Soft_Drink' },
      { text: 'Others', value: 'Other_Unknown' },

    ])

    const getAllDrinksByFirstLetter = async () => {
      try {
        loading.value = true
        const resp = await CocktailAPI.getAllAsc()
        listedDrinks.value = resp.data.drinks
        loading.value = false
      } catch (error) {
        console.error('Error trying to list the drinks:', error)
        throw error
      }
    }

    const getDrinksByCategory = async (category: string) => {
      try {
        loading.value = true
        const resp = await CocktailAPI.searchByCategory(category)
        console.log(resp.data.drinks)
        listedDrinks.value = resp.data.drinks
        loading.value = false
      } catch (error) {
        console.error('Error trying to list the drinks:', error)
        throw error
      }
    }

    return {
      loading,
      listedDrinks,
      drinkCategories,
      getAllDrinksByFirstLetter,
      getDrinksByCategory
    }
  }
}
</script>

<style>

</style>