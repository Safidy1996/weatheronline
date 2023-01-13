import { State } from './interfaces';
import { UnitConstant } from '@/constants';
import { unitOption } from '@/interfaces';

const states: State = {
  activeUnit: UnitConstant.find((unit : unitOption) => unit.value === process.env.VUE_APP_DEFAULT_UNIT),
  active: {},
};

export default states;
