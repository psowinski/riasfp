import { Record } from 'immutable';

const UNIT = 'Unit';
const Unit = new Record({}, UNIT);

Unit.prototype.toString = function() {
  return UNIT;
};

export const unit = new Unit();
