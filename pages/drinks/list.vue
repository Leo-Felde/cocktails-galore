<template>
  <div>
    <div class="d-flex justify-center pb-1 mb-1">
      <v-btn
        v-for="category in drinkCategories"
        :key="category.value"
        text
        class="mx-1"
        @click="getDrinksByCategory(category.value)"
      >
        {{  category.text }}
      </v-btn>
    </div>
  
    <v-row
      v-if="!loading && listedDrinks?.length > 0"
      justify="center"
      class="drink-list"
      no-gutters
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
      <v-row justify="center">
        <v-col
          v-for="i in 9"
          :key="i"
          lg="2"
          md="3"
          xs="12"
          class="mt-4 mx-2"
        >
          <VSkeletonLoader height="300"/>
        </v-col>
      </v-row>
    </div>
    <div class="d-flex" v-else>
      <div class="mx-auto"> No drinks were found :( </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue'
import CocktailAPI from '~/api/CocktailsBD'
import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader'


declare interface Drink {
    strDrink: string,
    strDrinkThumb: string,
    idDrink: string
  }

export default {
  components: {
    VSkeletonLoader
  },

  setup () {
    const listedDrinks = ref(Array<Drink>)
    const loading = ref(true)

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
  
    const getDrinksByCategory = async (category: string) => {
      try {
        loading.value = true
        const resp = await CocktailAPI.searchByCategory(category)

        listedDrinks.value = resp.data.drinks
      } catch (error) {
        console.error('Error trying to list the drinks:', error)
        throw error
      } finally {
          loading.value = false
      }
    }

    onMounted(() => {
      getDrinksByCategory(drinkCategories.value[0].value)
    })

    return {
      loading,
      listedDrinks,
      drinkCategories,
      getDrinksByCategory
    }
  }
}
</script>

<style lang="sass" scoped>
:deep(  .v-skeleton-loader__bone.v-skeleton-loader__image)
  height: 100% !important

.drink-list
  max-height: calc(100vh - 108px)
  padding-bottom: 10px
  position: relative
  overflow: scroll
</style>