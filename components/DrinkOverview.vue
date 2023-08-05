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
import { ref, computed } from 'vue'

interface Drink {
    strDrink: string,
    strDrinkThumb: string,
    idDrink: string
  }

export default {
  name: 'DrinkOverview',

  props: {
    data: { type: Object as () => Drink, required: true }
  },

  emits: ['toggleFavourite', 'click'],

  setup (props: { data: Drink }, context) {
    const drink = computed(() => {
      return props.data
    })

    const favourite = computed(() => {
      return false
      // buscar na store pelo id?
    })

    const toggleFavourite = () => {
      context.emit('toggleFavourite', drink.value.idDrink)
    }

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