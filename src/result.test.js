import { describe, it } from 'mocha';
import { expect } from 'chai';
import { ok, error } from './result';

describe('Result tests', function() {
  it('do not allow to create result with undefined and null', function() {
    expect(() => ok()).to.throw();
    expect(() => ok(null)).to.throw();
    expect(() => error()).to.throw();
    expect(() => error(null)).to.throw();
  });

  it('ok should report as ok and not error', function() {
    expect(ok(1).isOk()).to.be.true;
    expect(ok(1).isError()).to.be.false;
  });

  it('error should report as not ok and error', function() {
    expect(error(1).isOk()).to.be.false;
    expect(error(1).isError()).to.be.true;
  });

  it('should bind ok value', function() {
    expect(ok(5).bind(x => ok(x + 1)).ok).to.be.equal(6);
  });

  it('should pass error on bind', function() {
    expect(error(2).bind(() => error(4)).error).to.be.equal(2);
  });

  it('should bind error value', function() {
    expect(error('ab').bindError(x => error(x + 'c')).error).to.be.equal('abc');
  });

  it('should pass ok on error bind', function() {
    expect(ok('a').bindError(() => ok('b')).ok).to.be.equal('a');
  });

  it('should map ok value', function() {
    expect(ok(5).map(x => x + 1).ok).to.be.equal(6);
  });

  it('should pass error on map', function() {
    expect(error(2).map(() => error(4)).error).to.be.equal(2);
  });

  it('should map error value', function() {
    expect(error(1).mapError(x => x + 1).error).to.be.equal(2);
  });

  it('should pass ok on error map', function() {
    expect(ok(1).mapError(() => ok(4)).ok).to.be.equal(1);
  });

  it('match should work with ok value', function() {
    expect(
      ok(10).match({
        ok: x => x + 1,
        error: x => x + 5
      })
    ).to.be.equal(11);
  });

  it('match should work with error value', function() {
    expect(
      error(10).match({
        ok: x => x + 1,
        error: x => x + 5
      })
    ).to.be.equal(15);
  });

  it('tee should pass ok value', function() {
    let actual = 0;
    ok(1).tee(x => (actual = x));
    expect(actual).to.be.equal(1);
  });

  it('tee error should pass error value', function() {
    let actual = 0;
    error(123).teeError(x => (actual = x));
    expect(actual).to.be.equal(123);
  });

  it('tee should return orginal value', function() {
    expect(ok(1).tee(() => {}).ok).to.be.equal(1);
    expect(error(1).tee(() => {}).error).to.be.equal(1);
  });

  it('tee error should return orginal value', function() {
    expect(ok(1).teeError(() => {}).ok).to.be.equal(1);
    expect(error(1).teeError(() => {}).error).to.be.equal(1);
  });

  it('to string should generate correct string', function() {
    expect(ok(123).toString()).to.be.equal('Ok(123)');
    expect(error('abc').toString()).to.be.equal('Error(abc)');
  });
});
