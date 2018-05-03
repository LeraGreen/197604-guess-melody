import {assert} from 'chai';
import {GameModel} from "../game-model/game-model";
import {splitTime} from "./game-data";


describe(`check answer type`, () => {
  it(`should return fast for correct answer for 10 seconds`, () => {
    assert.equal(`fast`, GameModel.getAnswerType(true, 10));
  });

  it(`should return wrong for un correct answer`, () => {
    assert.equal(`wrong`, GameModel.getAnswerType(false, 10));
  });

  it(`should return correct for right answer and 40 seconds`, () => {
    assert.equal(`correct`, GameModel.getAnswerType(true, 40));
  });
});

describe(`points from answers`, () => {
  it(`should return 2 if answer is fast`, () => {
    const testModel = new GameModel();
    testModel._state.answers = [`fast`];
    testModel.calcPoints();
    assert.equal(2, testModel.calcPoints());
  });

  it(`should return 1 if answer is correct`, () => {
    const testModel = new GameModel();
    testModel._state.answers = [`correct`];
    assert.equal(1, testModel.calcPoints());
  });

  it(`should return 0 if answers are fast and wrong`, () => {
    const testModel = new GameModel();
    testModel._state.answers = [`fast`, `wrong`];
    assert.equal(0, testModel.calcPoints());
  });

  it(`should return -1 if wrong answers are more then others`, () => {
    const testModel = new GameModel();
    testModel._state.answers = [`wrong`, `wrong`, `wrong`, `wrong`, `fast`, `fast`, `fast`, `wrong`, `wrong`, `wrong`];
    assert.equal(-1, testModel.calcPoints());
  });

  it(`should return 10 if all answers are correct`, () => {
    const testModel = new GameModel();
    testModel._state.answers = [`correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`];
    assert.equal(10, testModel.calcPoints());
  });

  it(`should return 5 if 3 answers are wrong, 4 answers are fast and 3 is correct`, () => {
    const testModel = new GameModel();
    testModel._state.answers = [`fast`, `wrong`, `correct`, `fast`, `wrong`, `correct`, `fast`, `wrong`, `correct`, `fast`];
    assert.equal(5, testModel.calcPoints());
  });
});

describe(`winner statistics from game`, () => {
  it(`should return 33 percent for winner`, () => {
    const otherResults = [20, 15, 14, 5, 3];
    assert.equal(33, GameModel.getWinnerStatistic(13, otherResults).percent);
  });
  it(`should return 6 players`, () => {
    const otherResults = [20, 15, 14, 5, 3];
    assert.equal(6, GameModel.getWinnerStatistic(13, otherResults).players);
  });
  it(`should return 4 for user position`, () => {
    const otherResults = [20, 15, 14, 5, 3];
    assert.equal(4, GameModel.getWinnerStatistic(13, otherResults).position);
  });
  it(`should return 100 percent for winner`, () => {
    const otherResults = [20, 15, 14, 5, 3];
    assert.equal(83, GameModel.getWinnerStatistic(25, otherResults).percent);
  });
  it(`should return 6 players`, () => {
    const otherResults = [20, 15, 14, 5, 3];
    assert.equal(6, GameModel.getWinnerStatistic(25, otherResults).players);
  });
  it(`should return 1 for user position`, () => {
    const otherResults = [20, 15, 14, 5, 3];
    assert.equal(1, GameModel.getWinnerStatistic(25, otherResults).position);
  });
  it(`should work with the smallest number`, () => {
    const otherResults = [20, 15, 14, 5, 3];
    assert.equal(6, GameModel.getWinnerStatistic(1, otherResults).position);
    assert.equal(6, GameModel.getWinnerStatistic(1, otherResults).players);
    assert.equal(0, GameModel.getWinnerStatistic(1, otherResults).percent);
  });
});
//
// describe.skip(`Change state`, () => {
//   describe(`Change mistakes`, () => {
//     it(`Should increase current mistakes and show that mistakes hasn't reached maximum`, () => {
//       const mistakesTest = Object.assign({}, currentState, {
//         mistakes: 0
//       });
//       assert.equal(1, upMistake(mistakesTest).mistakes);
//     });
//
//     it(`Shouldn't increase current mistakes and should show that mistakes has reached maximum`, () => {
//       const mistakesTest = Object.assign({}, currentState, {
//         mistakes: 2
//       });
//       assert.equal(3, upMistake(mistakesTest).mistakes);
//     });
//
//     it(`Shouldn't increase current mistakes and should show that mistakes has reached maximum`, () => {
//       const mistakesTest = Object.assign({}, currentState, {
//         mistakes: 3,
//         isFinished: false
//       });
//       assert.equal(3, upMistake(mistakesTest).mistakes);
//     });
//   });
//
//   describe(`Timer tick`, () => {
//     it(`Should decrease current time on tick and show that time hasn't reached minimum`, () => {
//       const timerTest = Object.assign({}, currentState, {
//         time: 27
//       });
//
//       assert.equal(26, tick(timerTest).time);
//     });
//
//     it(`Should tick and return flag if timer hasn't reached maximum`, () => {
//       const timerTest = Object.assign({}, currentState, {
//         time: 5 * 60
//       });
//
//       assert.equal(299, tick(timerTest).time);
//     });
//
//     it(`Should return 0 and flag if timer already in minimum`, () => {
//       const timerTest = Object.assign({}, currentState, {
//         time: 0
//       });
//
//       assert.equal(0, tick(timerTest).time);
//     });
//
//     it(`Should return 0 and flag if timer already in minimum`, () => {
//       const timerTest = Object.assign({}, currentState, {
//         time: 1
//       });
//
//       assert.equal(0, tick(timerTest).time);
//     });
//   });
//
// });
//
describe(`Get minutes and seconds from seconds`, () => {
  it(`Shoulls return 4 minutes and 59 seconds`, () => {
    const testTime = 299;

    assert.equal(4, splitTime(testTime).minutes);
    assert.equal(59, splitTime(testTime).seconds);
  });

  it(`Shoulls return 0 minutes and 59 seconds`, () => {
    const testTime = 59;

    assert.equal(0, splitTime(testTime).minutes);
    assert.equal(59, splitTime(testTime).seconds);
  });

  it(`Shoulls return 5 minutes and 0 seconds`, () => {
    const testTime = 300;

    assert.equal(5, splitTime(testTime).minutes);
    assert.equal(0, splitTime(testTime).seconds);
  });
});

describe(`Calc answers type`, () => {
  it(`Shouls return 3 wrong answers`, () => {
    const testModel = new GameModel();
    testModel._state.answers = [`fast`, `correct`, `wrong`, `fast`, `correct`, `wrong`, `fast`, `correct`, `wrong`, `fast`];

    assert.equal(3, testModel.calcAnswersType(`wrong`));
  });

  it(`Shouls return 3 correct answers`, () => {
    const testModel = new GameModel();
    testModel._state.answers = [`fast`, `correct`, `wrong`, `fast`, `correct`, `wrong`, `fast`, `correct`, `wrong`, `fast`];

    assert.equal(3, testModel.calcAnswersType(`correct`));
  });

  it(`Shouls return 0 correct answers`, () => {
    const testModel = new GameModel();
    testModel._state.answers = [`fast`, `wrong`, `fast`, `wrong`, `fast`, `wrong`, `fast`];

    assert.equal(0, testModel.calcAnswersType(`correct`));
  });
});
