<template>
  <component :is="resolveLayoutVariant">
    <router-view></router-view>
  </component>
</template>

<script lang="ts">
import { useRouter } from "@/utils";
import { defineComponent } from "vue";
import { computed } from "vue";
import LayoutContent from "@/layouts/content/LayoutContent.vue";
import LayoutBlank from "@/layouts/LayoutBlank.vue";

export default defineComponent({
  components: {
    LayoutContent,
    LayoutBlank,
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
