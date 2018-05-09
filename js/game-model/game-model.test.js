import {assert} from 'chai';
import GameModel from './game-model';


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
  const testQuestions = [{'question': 12}, {'question': 13}, {'question': 12}];

  it(`should return 2 if answer is fast`, () => {
    const testModel = new GameModel(testQuestions);
    testModel._state.answers = [`fast`];
    assert.equal(2, testModel.calcPoints());
  });

  it(`should return 1 if answer is correct`, () => {
    const testModel = new GameModel(testQuestions);
    testModel._state.answers = [`correct`];
    assert.equal(1, testModel.calcPoints());
  });

  it(`should return 0 if answers are fast and wrong`, () => {
    const testModel = new GameModel(testQuestions);
    testModel._state.answers = [`fast`, `wrong`];
    assert.equal(0, testModel.calcPoints());
  });

  it(`should return 10 if all answers are correct`, () => {
    const testModel = new GameModel(testQuestions);
    testModel._state.answers = [`correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`];
    assert.equal(10, testModel.calcPoints());
  });

  it(`should return 5 if 3 answers are wrong, 4 answers are fast and 3 is correct`, () => {
    const testModel = new GameModel(testQuestions);
    testModel._state.answers = [`fast`, `wrong`, `correct`, `fast`, `wrong`, `correct`, `fast`, `wrong`, `correct`, `fast`];
    assert.equal(5, testModel.calcPoints());
  });
});

describe(`winner statistics from game`, () => {

  describe(`percent`, () => {
    const otherResults = [
      {'points': 20},
      {'points': 15},
      {'points': 14},
      {'points': 5},
      {'points': 3}];

    it(`should return 33 percent for winner`, () => {
      assert.equal(33, GameModel.getWinnerStatistic(13, otherResults).percent);
    });
    it(`should return 100 percent for winner`, () => {
      assert.equal(83, GameModel.getWinnerStatistic(25, otherResults).percent);
    });
    it(`should return 0 percent for winner`, () => {
      assert.equal(0, GameModel.getWinnerStatistic(1, otherResults).percent);
    });
  });

  describe(`position`, () => {
    const otherResults = [
      {'points': 20},
      {'points': 15},
      {'points': 14},
      {'points': 5},
      {'points': 3}];

    it(`should return 4 for user position`, () => {
      assert.equal(4, GameModel.getWinnerStatistic(13, otherResults).position);
    });
    it(`should return 1 for user position`, () => {
      assert.equal(1, GameModel.getWinnerStatistic(25, otherResults).position);
    });
    it(`should return 6 for user position`, () => {
      assert.equal(6, GameModel.getWinnerStatistic(1, otherResults).position);
    });
  });

  describe(`players`, () => {
    const otherResults = [
      {'points': 20},
      {'points': 15},
      {'points': 14},
      {'points': 5},
      {'points': 3}];

    it(`should return 6 players`, () => {
      assert.equal(6, GameModel.getWinnerStatistic(13, otherResults).players);
    });
    it(`should return 6 players`, () => {
      assert.equal(6, GameModel.getWinnerStatistic(25, otherResults).players);
    });
    it(`should return 6 players`, () => {
      assert.equal(6, GameModel.getWinnerStatistic(1, otherResults).players);
    });
  });
});

describe(`Calc answers type`, () => {
  const testQuestions = [{'question': 12}, {'question': 13}, {'question': 12}];

  it(`Shouls return 3 wrong answers`, () => {
    const testModel = new GameModel(testQuestions);
    testModel._state.answers = [`fast`, `correct`, `wrong`, `fast`, `correct`, `wrong`, `fast`, `correct`, `wrong`, `fast`];

    assert.equal(3, testModel.calcAnswersType(`wrong`));
  });

  it(`Shouls return 3 correct answers`, () => {
    const testModel = new GameModel(testQuestions);
    testModel._state.answers = [`fast`, `correct`, `wrong`, `fast`, `correct`, `wrong`, `fast`, `correct`, `wrong`, `fast`];

    assert.equal(3, testModel.calcAnswersType(`correct`));
  });

  it(`Shouls return 0 correct answers`, () => {
    const testModel = new GameModel(testQuestions);
    testModel._state.answers = [`fast`, `wrong`, `fast`, `wrong`, `fast`, `wrong`, `fast`];

    assert.equal(0, testModel.calcAnswersType(`correct`));
  });
});
