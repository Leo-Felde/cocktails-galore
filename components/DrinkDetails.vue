<template>
  <div class="d-flex ma-auto" style="height: 100%">
    <v-card
      class="d-flex flex-column ma-auto"
      :class="`recipe-card${mobile ? '-mobile' : ''}`"
    >
      <v-card-title>
        <v-btn
          icon="mdi-arrow-left"
          variant="text"
          @click="returnToHome"
        />
        {{ data.strDrink }}
      </v-card-title>
      <div
        class="d-flex content"
        :class="{ 'flex-column': mobile }"
       >
        <div class="d-flex pa-4">
          <v-img
            :src="drink.strDrinkThumb"
            lazy-src="https://www.svgrepo.com/download/11140/picture.svg"
            aspect-ratio="1/1"
            class="mx-auto"
            :width="mobile ? 200 : 425"
          />
        </div>
        <div class="pa-4 d-flex flex-column">
          <div class="ingredients d-flex flex-column">
            <span class="text-h5 text-center">
              Ingredients
            </span>
            <v-row no-gutters>
              <v-col
                v-for="ingredient in ingredients"
                md="6"
                sm="2"
                cols="6"
                class="pa-0"
              >
                <span> {{ ingredient.measure }} {{ ingredient.name }} </span>
              </v-col>
            </v-row>
          </div>

          <div
            class="mt-4 pt-4 instructions d-flex flex-column"
            :class="{'pb-12': mobile}"
          >
            <span class="text-h5 text-center">
              Preparation
            </span>
            <div>
              {{ drink.strInstructions || 'No english instructions avaliable' }}
            </div>
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue'
import { useDisplay } from 'vuetify'

interface DrinkDetails {
    strDrink: string,
    strDrinkThumb: string,
    strInstructions: string,
    idDrink: string,
    strIngredient1: string,
    strIngredient2: string,
    strIngredient3: string,
    strIngredient4: string,
    strIngredient5: string,
    strIngredient6: string,
    strIngredient7: string,
    strIngredient8: string,
    strIngredient9: string,
    strIngredient10: string,
    strIngredient11: string,
    strIngredient12: string,
    strIngredient13: string,
    strIngredient14: string,
    strIngredient15: string,
    strMeasure1: string,
    strMeasure2: string,
    strMeasure3: string,
    strMeasure4: string,
    strMeasure5: string,
    strMeasure6: string,
    strMeasure7: string,
    strMeasure8: string,
    strMeasure9: string,
    strMeasure10: string,
    strMeasure11: string,
    strMeasure12: string,
    strMeasure13: string,
    strMeasure14: string,
    strMeasure15: string
  }

interface Ingredient {
  name: string,
  measure: string
}

export default {
  name: 'DrinkDetails',
  
  props: {
    data: { type: Object as () => DrinkDetails, required: true }
  },

  setup (props) {
    const { mobile } = useDisplay()

    const ingredients = reactive(new Array<Ingredient>)

    const drink = computed(() => {
      return props.data
    })

    watch(() => props.data, (newValue) => {
      if (newValue.idDrink) {
        formatIngredietList()
      }
    })

    const formatIngredietList = () => {
      for (let i = 1; i < 16; i++) {
        if (drink.value[`strIngredient${i}`] !== null) {
          const ingredient: Ingredient = {
            name: drink.value[`strIngredient${i}`],
            measure: drink.value[`strMeasure${i}`]
          }
          ingredients.push(ingredient)
        }
      }
    }

    const returnToHome = () => {
      navigateTo({path: `/`})
    }

    return {
      drink,
      mobile,
      ingredients,
      returnToHome
    }
  }
}
</script>

<style lang="sass" scoped>
.recipe-card
  max-width: 880px
  width: 100%
  &-mobile
    max-height: 100vh
    height: 100%
    max-width: 100vw
    width: 100%
    border-radius: 0
    overflow: hidden
    .content
      overflow: scroll

.instructions
  border-top: 1px solid #84848440
</style>