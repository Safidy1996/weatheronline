import { unitOption } from "@/interfaces";
import { State } from "./interfaces";

export function activeUnit(state: State): unitOption | undefined {
  return state.activeUnit;
}
export function active(state: State): any {
  return state.active;
}
