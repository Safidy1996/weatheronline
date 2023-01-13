import { unitOption } from "@/interfaces";

const unit = Object.freeze<Array<unitOption>>([
  {
    text: "Metric: °C, m/s",
    value: "metric",
    tempUnit: "°C",
    speedUnit: "m/s",
  },
  {
    text: "Imperial: °F, mph",
    value: "imperial",
    tempUnit: "%F",
    speedUnit: "mph",
  },
]);

export default unit;
