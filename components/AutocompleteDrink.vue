<template>
  <div>
    <v-autocomplete
      v-model="selectedDrink"
      placeholder="search a drink"
      prepend-inner-icon="mdi-magnify"
      item-title="strDrink"
      item-value="idDrink"
      density="compact"
      rounded
      variant="solo"
      hide-details
      :items="drinksFound"
      :loading="loading"
      @update:search="searchForDrinks"
      @update:modelValue="selectDrink"
    />
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'

import CocktailAPI from '~/api/CocktailsBD'

export default {
  name: 'AutocompleteDrink',

  setup () {
    const drinksFound = ref([])
    const selectedDrink = ref<string>('')
    const loading = ref(false)
    
    const searchForDrinks = async (test: string) => {
      if (test === '') {
        drinksFound.value = []
        return
      }
      try {
        loading.value = true
        const resp = await CocktailAPI.searchByName(test)
        console.log(resp)
        drinksFound.value = resp.data.drinks
      } catch (error) {
        // console.error('Error trying to get the drink:', error)
        throw error
      } finally {
        loading.value = false
      }
    }

    const selectDrink = async () => {
      if (selectedDrink.value) {
        navigateTo({path: `/drink-${selectedDrink.value}`})
        selectedDrink.value = null
      }
    }

    return {
      loading,
      selectedDrink,
      drinksFound,
      searchForDrinks,
      selectDrink
    }
  }
}
</script>

<style lang="sass" scoped>
:deep(.v-field__field)
  height: 35px !important
:deep(.v-field__input)
  padding-top: 5px
</style>