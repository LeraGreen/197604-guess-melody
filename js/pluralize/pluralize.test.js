import {assert} from 'chai';
import pluralize from './pluralize';

describe(`check answer type`, () => {
  it(`should return '25 секунд'`, () => {
    assert.equal(`25 секунд`, pluralize(25, [`секунд`, `секунда`, `секунды`]));
  });

  it(`should return '25 дней'`, () => {
    assert.equal(`25 дней`, pluralize(25, [`дней`, `день`, `дня`]));
  });

  it(`should return '2 секунды'`, () => {
    assert.equal(`2 секунды`, pluralize(2, [`секунд`, `секунда`, `секунды`]));
  });

  it(`should return '2 дня'`, () => {
    assert.equal(`2 дня`, pluralize(2, [`дней`, `день`, `дня`]));
  });

  it(`should return '3 секунды'`, () => {
    assert.equal(`3 секунды`, pluralize(3, [`секунд`, `секунда`, `секунды`]));
  });

  it(`should return '4 секунды'`, () => {
    assert.equal(`4 секунды`, pluralize(4, [`секунд`, `секунда`, `секунды`]));
  });

  it(`should return '0 секунд'`, () => {
    assert.equal(`0 секунд`, pluralize(0, [`секунд`, `секунда`, `секунды`]));
  });

  it(`should return '1 секунду'`, () => {
    assert.equal(`1 секунду`, pluralize(1, [`секунд`, `секунду`, `секунды`]));
  });

  it(`should return '7 секунд'`, () => {
    assert.equal(`7 секунд`, pluralize(7, [`секунд`, `секунда`, `секунды`]));
  });

  it(`should return '8 секунд'`, () => {
    assert.equal(`8 секунд`, pluralize(8, [`секунд`, `секунда`, `секунды`]));
  });

  it(`should return '11 секунд'`, () => {
    assert.equal(`11 секунд`, pluralize(11, [`секунд`, `секунда`, `секунды`]));
  });

  it(`should return '19 секунд'`, () => {
    assert.equal(`19 секунд`, pluralize(19, [`секунд`, `секунда`, `секунды`]));
  });

  it(`should return '20 секунд'`, () => {
    assert.equal(`20 секунд`, pluralize(20, [`секунд`, `секунда`, `секунды`]));
  });

  it(`should return '31 секунда'`, () => {
    assert.equal(`31 секунда`, pluralize(31, [`секунд`, `секунда`, `секунды`]));
  });

  it(`should return '44 секунды'`, () => {
    assert.equal(`44 секунды`, pluralize(44, [`секунд`, `секунда`, `секунды`]));
  });

  it(`should return '22 секунды'`, () => {
    assert.equal(`22 секунды`, pluralize(22, [`секунд`, `секунда`, `секунды`]));
  });

  it(`should return '51 секунда'`, () => {
    assert.equal(`51 секунда`, pluralize(51, [`секунд`, `секунда`, `секунды`]));
  });

  it(`should return '51 день'`, () => {
    assert.equal(`51 день`, pluralize(51, [`дней`, `день`, `дня`]));
  });

  it(`should return '27 секунд'`, () => {
    assert.equal(`27 секунд`, pluralize(27, [`секунд`, `секунда`, `секунды`]));
  });

  it(`should return '38 секунд'`, () => {
    assert.equal(`38 секунд`, pluralize(38, [`секунд`, `секунда`, `секунды`]));
  });

  it(`should return '101 секунда'`, () => {
    assert.equal(`101 секунда`, pluralize(101, [`секунд`, `секунда`, `секунды`]));
  });

  it(`should return number instead of uncorrect array`, () => {
    assert.equal(`101`, pluralize(101, []));
    assert.equal(`101`, pluralize(101, [`rgdrdhdh`, `wgsgwgwhwh`]));
    assert.equal(`101`, pluralize(101, [`rgdrdhdh`, `wgsgwgwhwh`, `rgdrdhdh`, `wgsgwgwhwh`, `rgdrdhdh`, `wgsgwgwhwh`]));
  });
});
