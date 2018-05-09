import {assert} from 'chai';
import {splitTime} from "./utils";

describe(`Get minutes and seconds from seconds`, () => {
  it(`Should return 4 minutes and 59 seconds`, () => {
    const testTime = 299;

    assert.equal(4, splitTime(testTime).minutes);
    assert.equal(59, splitTime(testTime).seconds);
  });

  it(`Should return 0 minutes and 59 seconds`, () => {
    const testTime = 59;

    assert.equal(0, splitTime(testTime).minutes);
    assert.equal(59, splitTime(testTime).seconds);
  });

  it(`Should return 5 minutes and 0 seconds`, () => {
    const testTime = 300;

    assert.equal(5, splitTime(testTime).minutes);
    assert.equal(0, splitTime(testTime).seconds);
  });
});
