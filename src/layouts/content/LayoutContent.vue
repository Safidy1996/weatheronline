<template>
  <v-app class="app">
    <navigation-bar></navigation-bar>
    <v-main class="mt-4">
      <v-container fluid class="main mx-auto">
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-footer color="grey lighten-2" app>
      <span class="black--text caption">
        &copy; Rojoniaina Safidy Rakotondranary - Test Celaneo
      </span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { useRouter } from "@/utils";
import { defineComponent } from "vue";
import { computed } from "vue";
import NavigationBar from "@/layouts/content/NavigationBar.vue";

export default defineComponent({
  components: {
    NavigationBar,
  },
  setup() {
    const route = useRouter()?.route?.value;

    const resolveLayoutVariant = computed<string>(() => {
      if (!route || !route.meta || route.meta.layout === "blank")
        return "layout-blank";
      else if (route.meta.layout === "content") return "layout-content";

      return "";
    });

    return {
      resolveLayoutVariant,
    };
  },
});
</script>

<style lang="scss" scoped>
.app {
  background: #f4f5fa;
  .main {
    max-width: 1248px;
  }
}
</style>