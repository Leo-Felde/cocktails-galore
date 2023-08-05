
<template>
  <DrinkDetails :data="drink" />
</template>

<script lang="ts">
import { ref, onMounted } from 'vue'
import CocktailAPI from '~/api/CocktailsBD'

export default {
  setup() {
    const { id } = useRoute().params
    const loading = ref(true)

    const defaultDrink: Drink = {
      strDrink: '',
      strDrinkThumb: '',
      idDrink: ''
    }
    
    let drink = ref<Drink>(defaultDrink)

    onMounted(() => {
      getDrinkById()
    })

    const getDrinkById = async () => {
      try {
        loading.value = true
        const resp = await CocktailAPI.getById(id)
        
        drink.value = resp.data.drinks[0]
      } catch (error) {
        console.error('Error trying to get the drink:', error)
        navigateTo({path: '/'})
        throw error
      } finally {
        loading.value = false
      }
    }
    
    return {
      drink
    }
  },
}
</script>
