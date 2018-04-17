import {assert} from 'chai';
import plural from './plural';

describe(`check answer type`, () => {
  it(`should return 25`, () => {
    assert.equal(`25 секунд`, plural(25, [`секунд`, `секунда`, `секунды`]));
    assert.equal(`25 дней`, plural(25, [`дней`, `день`, `дня`]));
  });

  it(`should return 2`, () => {
    assert.equal(`2 секунды`, plural(2, [`секунд`, `секунда`, `секунды`]));
    assert.equal(`2 дня`, plural(2, [`дней`, `день`, `дня`]));
  });

  it(`should return 3 секунды`, () => {
    assert.equal(`3 секунды`, plural(3, [`секунд`, `секунда`, `секунды`]));
  });

  it(`should return 4 секунды`, () => {
    assert.equal(`4 секунды`, plural(4, [`секунд`, `секунда`, `секунды`]));
  });

  it(`should return 0 секунд`, () => {
    assert.equal(`0 секунд`, plural(0, [`секунд`, `секунда`, `секунды`]));
  });

  it(`should return 1 секунду`, () => {
    assert.equal(`1 секунду`, plural(1, [`секунд`, `секунду`, `секунды`]));
  });

  it(`should return 7 секунд`, () => {
    assert.equal(`7 секунд`, plural(7, [`секунд`, `секунда`, `секунды`]));
  });

  it(`should return 8 секунд`, () => {
    assert.equal(`8 секунд`, plural(8, [`секунд`, `секунда`, `секунды`]));
  });

  it(`should return 11 секунд`, () => {
    assert.equal(`11 секунд`, plural(11, [`секунд`, `секунда`, `секунды`]));
  });

  it(`should return 19 секунд`, () => {
    assert.equal(`19 секунд`, plural(19, [`секунд`, `секунда`, `секунды`]));
  });

  it(`should return 20 секунд`, () => {
    assert.equal(`20 секунд`, plural(20, [`секунд`, `секунда`, `секунды`]));
  });

  it(`should return 31 секунда`, () => {
    assert.equal(`31 секунда`, plural(31, [`секунд`, `секунда`, `секунды`]));
  });

  it(`should return 44 секунды`, () => {
    assert.equal(`44 секунды`, plural(44, [`секунд`, `секунда`, `секунды`]));
  });

  it(`should return 22 секунды`, () => {
    assert.equal(`22 секунды`, plural(22, [`секунд`, `секунда`, `секунды`]));
  });

  it(`should return 51`, () => {
    assert.equal(`51 секунда`, plural(51, [`секунд`, `секунда`, `секунды`]));
    assert.equal(`51 день`, plural(51, [`дней`, `день`, `дня`]));
  });

  it(`should return 27 секунд`, () => {
    assert.equal(`27 секунд`, plural(27, [`секунд`, `секунда`, `секунды`]));
  });

  it(`should return 38 секунд`, () => {
    assert.equal(`38 секунд`, plural(38, [`секунд`, `секунда`, `секунды`]));
  });

  it(`should return 101 секунда`, () => {
    assert.equal(`101 секунда`, plural(101, [`секунд`, `секунда`, `секунды`]));
  });

  it(`should return number instead of array`, () => {
    assert.equal(`101`, plural(101, []));
    assert.equal(`101`, plural(101, [`rgdrdhdh`, `wgsgwgwhwh`]));
    assert.equal(`101`, plural(101, [`rgdrdhdh`, `wgsgwgwhwh`, `rgdrdhdh`, `wgsgwgwhwh`, `rgdrdhdh`, `wgsgwgwhwh`]));
  });
});
