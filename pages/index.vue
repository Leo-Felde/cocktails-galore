<template>
  <div>
    <div class="d-flex justify-center pb-1 mb-1 actions">
      <v-card class="wrapper">
        <v-tabs
          v-model="tab"
          show-arrows
          color="rgb(140, 48, 66)"
          @update:modelValue="getDrinksByCategory"
        >
          <v-tab
            v-for="category in drinkCategories"
            :value="category.value"
          >
            {{ category.text }}
          </v-tab>
        </v-tabs>
      </v-card>
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
        md="2"
        xs="12"
        class="mt-4 mx-2"
      >
        <DrinkOverview
          :data="drink"
          @click="viewDetails"
          @toggle-favourite="toggleFavourite"
        />
      </v-col>
    </v-row>
    <div v-else-if="loading">
      <v-row
        justify="center"
        no-gutters
      >
        <v-col
          v-for="i in 9"
          :key="i"
          lg="2"
          md="2"
          xs="12"
          cols="9"
          class="mt-4 mx-2"
        >
          <VSkeletonLoader height="300" width="100%"/>
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
import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader'

import CocktailAPI from '~/api/CocktailsBD'

export default {
  name: 'Index',

  components: {
    VSkeletonLoader
  },

  setup () {
    const listedDrinks = ref(Array<Drink>)
    const loading = ref(true)
    const tab = ref('Ordinary_Drink')
    const favouriteDrinks = useFavouriteDrinks()

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

    onMounted(() => {
      getDrinksByCategory()
    })
  
    const getDrinksByCategory = async () => {
      try {
        loading.value = true
        const resp = await CocktailAPI.searchByCategory(tab.value)

        listedDrinks.value = resp.data.drinks
      } catch (error) {
        console.error('Error trying to list the drinks:', error)
        throw error
      } finally {
          loading.value = false
      }
    }

    const toggleFavourite = (drink: Drink) => {
      const drinkIndex = favouriteDrinks.value.findIndex(d => d.idDrink === drink.idDrink)
      if (drinkIndex >= 0) {
        favouriteDrinks.value.splice(drinkIndex, 1)
      } else {
        favouriteDrinks.value.push(drink)
      }
      console.log(favouriteDrinks.value)
    }

    const viewDetails = (id: string) => {
      navigateTo({path: `/drink-${id}`})
    }

    return {
      loading,
      listedDrinks,
      drinkCategories,
      tab,
      getDrinksByCategory,
      toggleFavourite,
      viewDetails
    }
  }
}
</script>

<style lang="sass" scoped>
:deep(.v-skeleton-loader__bone.v-skeleton-loader__image)
  width: 100%
  height: 100%

.drink-list
  max-height: calc(100vh - 108px)
  padding-bottom: 10px
  position: relative
  overflow: scroll

.actions
  max-width: 100vw
  overflow: hidden
</style>