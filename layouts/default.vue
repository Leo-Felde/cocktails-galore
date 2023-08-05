<template>
  <v-app>
    <v-card
      :color="theme.global.current.value.dark ? '#1a1a1a' : '#742232'"
      class="app-bar"
    >
      <div class="app-bar-content">
        <span class="text-h6">
          Cocktails Galore
          <v-icon> mdi-liquor </v-icon>
        </span>

        <v-spacer></v-spacer>

        <v-menu>
          <template v-slot:activator="{ props }">
            <span v-bind="props">
              My favourites
              <v-icon> mdi-chevron-down </v-icon>
            </span>
          </template>
          <v-list>
            <v-list-item
              v-for="(drink, index) in favouriteDrinks"
              :key="index"
              :value="index"
            >
              <v-list-item-title>
                {{ drink.name }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <theme-button @toggleTheme="toggleTheme"/>
      </div>
    </v-card>
      
    <!-- aqui é renderizada a página atual -->
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { useTheme } from 'vuetify'

export default {
  name: 'DefaultLayout',

  setup () {
    const favouriteDrinks = ref([{name: 'beer'}])
    const theme = useTheme()

    return {
      theme,
      favouriteDrinks,
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
    flex-grow: 1
</style>