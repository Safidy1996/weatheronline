<template>
  <div class="home">
    <Meteo />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Meteo from "@/components/Meteo.vue";

export default Vue.extend({
  name: "Home",
  components: {
    Meteo,
  },
});
</script>
