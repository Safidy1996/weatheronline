import { State } from './interfaces';
import { UnitConstant } from '@/constants';
import { unitOption } from '@/interfaces';

const defaultUnit = process.env.VUE_APP_DEFAULT_UNIT
console.log(defaultUnit)

const states: State = {
  activeUnit: UnitConstant.find((unit : unitOption) => unit.value === defaultUnit),
  active: {},
};

export default states;
