<template>
  <v-card
    class="mx-auto"
    max-width="300"
    @click="$emit('click', drink.idDrink)"
  >
    <v-card-title class="text-subtitle-1 d-flex">
      {{ drink.strDrink }}
      <v-btn
        density="comfortable"
        size="small"
        variant="text"
        icon="mdi-star"
        class="ml-auto"
        :color="favourite ? 'yellow': 'grey'"
        @click.stop="toggleFavourite"
      />
    </v-card-title>
    <v-card-text>
      <v-img
        :src="drink.strDrinkThumb"
        lazy-src="https://www.svgrepo.com/download/11140/picture.svg"
        aspect-ratio="1/1"
        class="mx-auto"
        width="250"
        />
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { ref, computed, onMounted } from 'vue'

export default {
  name: 'DrinkOverview',

  props: {
    data: { type: Object as () => Drink, required: true }
  },

  emits: ['toggleFavourite', 'click'],

  setup (props: { data: Drink }, context) {
    const favouriteDrinks = useFavouriteDrinks()
    const favourite = ref(false)

    const drink = computed(() => {
      return props.data
    })

    const toggleFavourite = () => {
      context.emit('toggleFavourite', drink.value)
      favourite.value = !favourite.value
    }

    const checkIfFavourite = () => {
      favourite.value = favouriteDrinks.value.find(d => d.idDrink === drink.value.idDrink)
    }
    
    onMounted(() => {
      checkIfFavourite()
    })

    return {
      drink,
      favourite,
      toggleFavourite
    }
  }
}

</script>

<style>

</style>