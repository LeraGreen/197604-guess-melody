import {assert} from 'chai';
import {settings, timer, tick, checkAnswer, calsPoints, getStatistics, getWinnerStatistics} from './game-data';


describe(`check answer type`, () => {
  it(`should return fast for correct answer for 10 seconds`, () => {
    assert.equal(`fast`, checkAnswer({answer: 1, time: 10}));
  });

  it(`should return wrong for uncorrect answer`, () => {
    assert.equal(`wrong`, checkAnswer({answer: 0, time: 10}));
  });

  it(`should return correct for right answer and 40 seconds`, () => {
    assert.equal(`correct`, checkAnswer({answer: 1, time: 40}));
  });
});


describe(`points from answers`, () => {
  it(`should return 2 if answer is fast`, () => {
    assert.equal(2, calsPoints([`fast`]));
  });

  it(`should return 1 if answer is correct`, () => {
    assert.equal(1, calsPoints([`correct`]));
  });

  it(`should return 0 if answers are fast and wrong`, () => {
    assert.equal(0, calsPoints([`fast`, `wrong`]));
  });

  it(`should return -1 if wrong answers are more then others`, () => {
    assert.equal(-1, calsPoints([`wrong`, `wrong`, `wrong`, `wrong`, `fast`, `fast`, `fast`, `wrong`, `wrong`, `wrong`]));
  });

  it(`should return 10 if all answers are correct`, () => {
    assert.equal(10, calsPoints([`correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`]));
  });

  it(`should return 5 if 3 answers are wrong, 4 answers are fast and 3 is correct`, () => {
    assert.equal(5, calsPoints([`fast`, `wrong`, `correct`, `fast`, `wrong`, `correct`, `fast`, `wrong`, `correct`, `fast`]));
  });
});

describe(`statistics from game`, () => {

  describe(`winner statistics from game`, () => {
    it(`should return 33 percent for winner`, () => {
      const otherResults = [20, 15, 3, 14, 5];
      assert.equal(33, getWinnerStatistics(13, otherResults).percent);
    });

    it(`should return 6 players`, () => {
      const otherResults = [20, 15, 3, 14, 5];
      assert.equal(6, getWinnerStatistics(13, otherResults).players);
    });

    it(`should return 4 for user position`, () => {
      const otherResults = [20, 15, 3, 14, 5];
      assert.equal(4, getWinnerStatistics(13, otherResults).position);
    });
  });

  describe(`Result message from game`, () => {
    it(`should return message about attempts out`, () => {
      const result = {
        points: 3,
        level: 5,
        remainingTime: 10,
        remainingLives: 0
      };
      assert.equal(`У вас закончились все попытки. Ничего, повезёт в следующий раз!`, getStatistics(result, settings));
    });

    it(`should return message about time out`, () => {
      const result = {
        points: 3,
        level: 9,
        remainingTime: 0,
        remainingLives: 2
      };
      assert.equal(`Время вышло! Вы не успели отгадать все мелодии`, getStatistics(result, settings));
    });

    it(`should return win message`, () => {
      const result = {
        points: 13,
        level: 10,
        remainingTime: 10,
        remainingLives: 2
      };
      const otherResults = [20, 15, 3, 14, 5];
      assert.equal(`Вы заняли 4 место из 6 игроков. Это лучше, чем у 33% игроков!`, getStatistics(result, settings, otherResults));
    });
  });
});

describe.only(`Timer tick`, () => {
  it(`Should decrease current time on tick and show that time hasn't reached minimum`, () => {
    const timerTest = Object.assign({}, timer, {
      currentTime: 27
    });

    assert.equal(26, tick(timerTest).currentTime);
    assert.equal(false, tick(timerTest).isFinished);
  });

  it(`Should tick and return flag if timer hasn't reached maximum`, () => {
    const timerTest = Object.assign({}, timer, {
      currentTime: 5 * 60
    });

    assert.equal(299, tick(timerTest).currentTime);
    assert(!tick(timerTest).isFinished);
  });

  it(`Should return 0 and flag if timer already in minimum`, () => {
    const timerTest = Object.assign({}, timer, {
      currentTime: 0
    });

    assert.equal(0, tick(timerTest).currentTime);
    assert.equal(true, tick(timerTest).isFinished);
  });
});

describe(`Change state`, () => {
  describe(`change mistakes`, () => {
    it(`Should increase current time on tick and show that time hasn't reached maximum`, () => {
      const timerTest = Object.assign({}, timer, {
        currentTime: 27
      });

      assert.equal(28, tick(timerTest).currentTime);
      assert.equal(false, tick(timerTest).isFinished);
    });

  });


});
