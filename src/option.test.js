import { describe, it } from 'mocha';
import { expect } from 'chai';
import { some, none, option } from './option';

describe('Option tests', function() {
  it('do not allow to create some with undefined and null', function() {
    expect(() => some()).to.throw();
    expect(() => some(null)).to.throw();
  });

  it('some should report as some and not none', function() {
    expect(some(1).isSome()).to.be.true;
    expect(some(1).isNone()).to.be.false;
  });

  it('none should report as none and not some', function() {
    expect(none.isSome()).to.be.false;
    expect(none.isNone()).to.be.true;
  });

  it('option should return none for undefined and null', function() {
    expect(option(undefined)).to.be.equal(none);
    expect(option(null)).to.be.equal(none);
  });

  it('option should return some for defined values', function() {
    expect(option(true).value).to.be.true;
    expect(option(123).value).to.be.equal(123);
  });

  it('should bind some value', function() {
    expect(some(1).bind(x => some(x + 1)).value).to.be.equal(2);
  });

  it('should pass none on bind', function() {
    expect(none.bind(() => some(1))).to.be.equal(none);
  });

  it('should map some value', function() {
    expect(some(1).map(x => x + 1).value).to.be.equal(2);
  });

  it('should pass none on map', function() {
    expect(none.map(() => 1)).to.be.equal(none);
  });

  it('tee should pass some value', function() {
    let actual = 0;
    some(1).tee(x => (actual = x));
    expect(actual).to.be.equal(1);
  });

  it('match should work with some value', function() {
    expect(
      some(3).match({
        some: x => x + 1,
        none: () => 1
      })
    ).to.be.equal(4);
  });

  it('match should work with none', function() {
    expect(
      none.match({
        some: () => 'xyz',
        none: () => 'abc'
      })
    ).to.be.equal('abc');
  });

  it('to string should generate correct string', function() {
    expect(some(123).toString()).to.be.equal('Some(123)');
    expect(none.toString()).to.be.equal('None');
  });
});
