import { UnitConstant } from "@/constants";
import unitOption from "@/interfaces/modules/unitOption";
import { State } from "./interfaces";

export function setUnit(state: State, unit: string): void {
  state.activeUnit = UnitConstant.find(
    (option: unitOption) => option.value === unit
  );
}
export function setActive(state: State, active: any): void {
  state.active = active;
}
