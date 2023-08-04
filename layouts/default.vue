<template>
  <v-app>
    <v-app-bar
      :color="theme.global.current.value.dark ? '#1a1a1a' : '#742232'"
      prominent
      class="pr-2 text-white"
    >

      <v-toolbar-title to="/" nuxt>
        Cocktails Galore
        <v-icon> mdi-liquor </v-icon>
      </v-toolbar-title>

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
            <v-list-item-title>{{ drink.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <theme-button @toggleTheme="toggleTheme"/>
    </v-app-bar>
      
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