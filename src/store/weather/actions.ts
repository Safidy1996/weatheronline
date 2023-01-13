import axios from "axios";
import { Store } from "vuex";

export function fetchWeather(store: Store<any>, query: string): Promise<any> {
  const units = store.getters.activeUnit.value;
  const apiKey = process.env.VUE_APP_TOKEN_OPEN_WEATHER_MAP;
  return axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${units}&appid=${apiKey}`
  );
}
