
<template>
  <div>
    <h1>Drink Details</h1>
    <p>Drink ID: {{ drinkId }}</p>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue'

export default {
  setup() {
    const route = useRoute()
    const drinkId = computed(() => route.params.id);

    return {
      drinkId,
    };
  },
}
</script>
