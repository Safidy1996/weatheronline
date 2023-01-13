<template>
  <div>
    <v-card>
      <v-card-title class="d-flex flex-column">
        <div class="orange--text caption">{{ currentTime }}</div>
        <h2 class="font-weight-semibold">
          {{ weather.name }}
          <span v-if="weather.sys?.country"> , {{ weather.sys.country }}</span>
        </h2>
        <h3 class="font-weight-regular" v-if="weather.coord">
          Lat: {{ weather.coord.lat }} / Long: {{ weather.coord.lon }}
        </h3>
      </v-card-title>
    </v-card>
    <v-card class="mt-4">
      <v-card-text v-if="weather.main">
        <div class="d-flex align-center">
          <v-icon size="20">{{ icons.mdiWeatherHurricane }}</v-icon>
          <h1 class="ml-2 font-weight-regular">
            {{ weather.main.temp }} {{ unit.tempUnit }}
          </h1>
        </div>

        <h3>
          Feels like: {{ weather.main.feels_like }}{{ unit.tempUnit }},
          <span v-for="weath in weather.weather" :key="weath.id">
            {{ weath.description }}</span
          >
        </h3>
        <div class="d-flex mt-4">
          <v-divider
            vertical
            color="orange accent-4"
            class="mr-4"
            :style="{ 'border-color': '#e65100 !important' }"
          />
          <div>
            <div class="d-flex">
              <p class="mb-0">
                <v-icon class="mr-1">{{ icons.mdiTailwind }}</v-icon
                >{{ weather.wind.speed }}{{ unit.speedUnit }}
              </p>
              <p class="ml-2 mb-0">
                <v-icon size="15" class="mr-1">{{
                  icons.mdiCarBrakeLowPressure
                }}</v-icon
                >{{ weather.main.pressure }}hPa
              </p>
            </div>
            <div>
              <p class="mb-0">Humidity: {{ weather.main.humidity }}%</p>
            </div>
            <div>
              <p class="mb-0">Visibility: {{ weather.visibility / 1000 }}km</p>
            </div>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import store from "@/store";
import {
  mdiWeatherHurricane,
  mdiTailwind,
  mdiCarBrakeLowPressure,
} from "@mdi/js";
import { defineComponent, computed } from "vue";
import moment from "moment";

export default defineComponent({
  setup() {
    const weather = computed(() => store.getters["weather/active"]);
    const unit = computed(() => store.getters["weather/activeUnit"]);

    const currentTime = moment().format("MMMM DD, h:mm a");

    return {
      currentTime,
      weather,
      unit,

      icons: {
        mdiWeatherHurricane,
        mdiTailwind,
        mdiCarBrakeLowPressure,
      },
    };
  },
});
</script>

<style lang="scss" scoped></style>
