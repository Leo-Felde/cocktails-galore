<template>
  <v-app>
    <v-card
      :color="theme.global.current.value.dark ? '#1a1a1a' : '#742232'"
      class="app-bar"
    >
      <div class="app-bar-content">
        <span :class="mobile ? 'text-body-1' : 'text-h6'">
          Cocktails Galore
          <v-icon v-if="!mobile"> mdi-liquor </v-icon>
        </span>

        <autocomplete-drink class="search" v-if="!mobile" />

        <div class="app-bar-content__actions">
          <v-menu>
            <template v-slot:activator="{ props }">
              <span
                v-bind="props"
                :class="mobile ? 'mr-2': 'mr-4'"
              >
                <v-icon size="small"> mdi-star </v-icon>
                favourites
              </span>
            </template>
            <v-list>
              <v-list-item
                v-for="(drink, index) in favouriteDrinks"
                :key="index"
                :value="index"
                @click="goToFavourite(drink.idDrink)"
              >
                <v-list-item-title>
                  {{ drink.strDrink }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item
                v-if="favouriteDrinks.length < 1"
              >
                <v-list-item-title class="caption">
                  No favourites found
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <theme-button @toggleTheme="toggleTheme"/>
        </div>
      </div>
    </v-card>
      
    <!-- aqui é renderizada a página atual -->
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { useTheme, useDisplay } from 'vuetify'

export default {
  name: 'DefaultLayout',

  setup () {
    const theme = useTheme()
    const { mobile } = useDisplay()
    const favouriteDrinks = useFavouriteDrinks()

    const goToFavourite = (id: string) => {
      navigateTo({path: `/drink-${id}`})
    }

    return {
      theme,
      favouriteDrinks,
      mobile,
      goToFavourite,
      toggleTheme: () => theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
    }
  }
}
</script>

<style lang="sass" scoped>
.app-bar
  display: flex
  height: 54px
  padding-left: 5px
  color: #ffffff
  border-radius: 0
  &-content
    margin-top: auto
    margin-bottom: auto
    display: flex
    align-items: center
    width: 100%
    height: inherit
    margin-left: 10px
    margin-right: 10px
    &__actions
      display: flex
      margin-left: auto

.search
  width: 300px !important
  margin-left: 10px
</style>