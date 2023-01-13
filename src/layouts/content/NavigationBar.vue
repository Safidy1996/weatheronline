<template>
  <v-card
    elevation="3"
    class="rounded-0"
  >
    <v-app-bar
      color="grey darken-2 px-12"
      dark
    >
      <v-row class="align-center">
        <v-col class="flex-grow-0 col-2">
          <v-icon size="30" color="orange darken-4">{{ appLogo }}</v-icon>
          <div>{{ appName }}</div>
        </v-col>
        
        <v-col class="col-3">
          <v-text-field
            dense
            v-model="input"
            placeholder="Search city"
            label="City"
            :loading="isFetching"
            :error-messages="inputErrorMessage"
            hide-details="auto"
            :prepend-icon="icons.mdiMagnify"
            color="orange accent-4"
            @blur="fetchWeather"
          ></v-text-field>
        </v-col>

        <v-col class="d-flex justify-end">
          <v-radio-group
            v-model="unit"
            row
          >
            <v-radio
              v-for="option in optionsUnit" :key="option.value"
              color="orange darken-4"
              class="mt-4"
              hide-details="auto"
              :label="option.text"
              :value="option.value"
            ></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
    </v-app-bar>
  </v-card>
</template>

<script lang="ts">
import store from '@/store'
import { useRouter } from "@/utils";
import { defineComponent, ref, computed, watch } from "vue";
import VueRouter, { Route } from "vue-router";
import config from "@/config";
import { mdiMagnify } from '@mdi/js';
import { UnitConstant as optionsUnit } from '@/constants';

export default defineComponent({
  setup() {
    const items = ref<Array<Route>>([]);
    const drawer = ref<boolean>(false);
    const input = ref<string>('');
    const inputErrorMessage = ref<string>('')
    const isFetching = ref<boolean>(false)

    // App configurations
    const appLogo = config.app.logo
    const appName = config.app.name

    // Temperature unit
    const unit = computed({
      get: () => {
        return store.getters['weather/activeUnit'].value
      },
      set: (newVal) => {
        store.commit('weather/setUnit', newVal)
      }
    })

    // Search method
    const fetchWeather = ():void => {
      isFetching.value = true
      store.dispatch('weather/fetchWeather', input.value)
        .then(response => response.data)
        .then(weather => {
          store.commit('weather/setActive', weather)
          isFetching.value = false
        })
        .catch(() => {
          store.commit('weather/setActive', {})
          isFetching.value = false
        })
    }

    const router:VueRouter | undefined = useRouter()?.router;
    const routesName: Array<string> = [ 'Home' ];

    routesName.forEach(routeName => {
      if (!router) return;
      const route = router.resolve({ name: routeName }).route;
      if (!route) return;

      return items.value.push(route);
    });

    watch (
      () => unit.value, 
      () => {
        if (input.value) fetchWeather();
      }
    )

    return {
      items,
      drawer,
      input,
      inputErrorMessage,
      isFetching,

      appName,
      appLogo,

      unit,
      optionsUnit,

      icons: {
        mdiMagnify,
      },

      fetchWeather,
    };
  }
})
</script>