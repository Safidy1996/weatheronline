import axios from "axios";
import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";

jest.mock("axios");

describe("fetchWeather", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  const store = new Vuex.Store({
    modules: { weather: require("@/store/weather").default },
  });

  it("should call axios with correct parameters (units, appId)", async () => {
    const response = { data: { main: { temp: 28 } } };
    const axiosGetMock = axios.get as jest.Mock;
    axiosGetMock.mockResolvedValue(response);

    const query = "Paris";
    const result = await store.dispatch("weather/fetchWeather", query);

    expect(result).toEqual(response);
    expect(axiosGetMock).toHaveBeenCalledWith(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${process.env.VUE_APP_DEFAULT_UNIT}&appid=${process.env.VUE_APP_TOKEN_OPEN_WEATHER_MAP}`
    );
  });
  it("should return error if query is not valid", async () => {
    const error = { response: { data: { message: "city not found" } } };
    const axiosGetMock = axios.get as jest.Mock;
    axiosGetMock.mockRejectedValue(error);

    const query = "InvalidCity";
    try {
      await store.dispatch("weather/fetchWeather", query);
    } catch (e) {
      expect(e).toEqual(error);
      expect(axiosGetMock).toHaveBeenCalledWith(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${process.env.VUE_APP_DEFAULT_UNIT}&appid=${process.env.VUE_APP_TOKEN_OPEN_WEATHER_MAP}`
      );
    }
  });
});
