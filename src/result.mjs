import { Record } from 'immutable';

const RESULT = 'Result';
const Result = new Record({ ok: undefined, error: undefined }, RESULT);

Result.prototype.isOk = function() {
  return this.ok != null;
};

Result.prototype.isError = function() {
  return !this.isOk();
};

Result.prototype.bind = function(f) {
  if (this.isOk()) {
    return f(this.ok);
  }
  return this;
};

Result.prototype.bindError = function(f) {
  if (this.isError()) {
    return f(this.error);
  }
  return this;
};

Result.prototype.map = function(f) {
  if (this.isOk()) {
    return ok(f(this.ok));
  }
  return this;
};

Result.prototype.mapError = function(f) {
  if (this.isError()) {
    return error(f(this.error));
  }
  return this;
};

Result.prototype.match = function({ ok, error }) {
  return this.isOk() ? ok(this.ok) : error(this.error);
};

Result.prototype.tee = function(f) {
  if (this.isOk()) f(this.ok);
  return this;
};

Result.prototype.teeError = function(f) {
  if (this.isError()) f(this.error);
  return this;
};

Result.prototype.toString = function() {
  if (this.isOk()) {
    return `Ok(${this.ok})`;
  }
  return `Error(${this.error})`;
};

export function ok(value) {
  if (value == null) {
    throw new Error('Cannot create result record with unknown && null values');
  }
  return new Result({
    ok: value
  });
}

export function error(value) {
  if (value == null) {
    throw new Error('Cannot create result record with unknown && null values');
  }
  return new Result({
    error: value
  });
}
