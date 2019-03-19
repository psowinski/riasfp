import { Record } from 'immutable';

const OPTION = 'Option';
const Option = new Record({ value: undefined }, OPTION);

Option.prototype.isSome = function() {
  return this.value != null;
};

Option.prototype.isNone = function() {
  return !this.isSome();
};

Option.prototype.bind = function(f) {
  if (this.isSome()) {
    return f(this.value);
  }
  return this;
};

Option.prototype.map = function(f) {
  if (this.isSome()) {
    return some(f(this.value));
  }
  return this;
};

Option.prototype.tee = function(f) {
  if (this.isSome()) f(this.value);
  return this;
};

Option.prototype.match = function({ some, none }) {
  return this.isSome() ? some(this.value) : none();
};

Option.prototype.toString = function() {
  return this.isSome() ? `Some(${this.value})` : 'None';
};

export const none = new Option();

export function some(value) {
  if (value == null) {
    throw new Error('Cannot create option record with unknown && null values');
  }
  return new Option({
    value: value
  });
}

export function option(value) {
  return value != null ? some(value) : none;
}
