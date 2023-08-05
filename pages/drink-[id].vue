
<template>
  <div>
    <h1>Drink Details</h1>
    <p>Drink ID: {{ id  }}</p>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue'
import CocktailAPI from '~/api/CocktailsBD'

interface Drink {
    strDrink: string,
    strDrinkThumb: string,
    idDrink: string
  }

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
        
        drink = resp.data.drinks[0]
        console.log(drink)
      } catch (error) {
        console.error('Error trying to get the drink:', error)
        throw error
      } finally {
          loading.value = false
      }
    }
    

    return {
      id
    }
  },
}
</script>
