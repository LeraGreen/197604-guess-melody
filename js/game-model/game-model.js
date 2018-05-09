import {answerPoints, INITIAL_STATE, SETTINGS, FAST_ANSWER_TIME, AnswerType} from '../game-data/game-data';

export const TimerResult = {
  TIME_OUT: `timeEnd`,
  ALARM: `alarm`,
  TICK: `tick`
};

export const ResultType = {
  TIME_OUT: `timeEnd`,
  WIN: `win`,
  ATTEMPTS_OUT: `attemptsOut`
};

export const QuestionType = {
  ARTIST: `artist`,
  GENRE: `genre`
};

class GameModel {
  constructor(questions) {
    this._questions = questions;

    this._settings = Object.assign({}, SETTINGS, {
      lastScreen: this._questions.length
    });

    this._state = Object.assign({}, INITIAL_STATE, {
      answers: []
    });
  }

  get question() {
    return this._questions[this._state.question];
  }

  get mistakes() {
    return this._state.mistakes;
  }

  get questionType() {
    return this.question.type;
  }

  get gameTime() {
    return this._settings.timeToGame;
  }

  get time() {
    return this._state.time;
  }

  _checkMistake() {
    const lastAnswer = this._state.answers[this._state.answers.length - 1];
    if (lastAnswer === AnswerType.WRONG) {
      this._upMistake();
    }
  }

  _upMistake() {
    if (this._state.mistakes < this._settings.maxMistakes) {
      this._state.mistakes++;
    }
  }

  _addAnswer(answer) {
    this._state.answers.push(answer);
  }

  tickTimer() {
    this._state.time--;
  }

  checkTimer() {
    if (this._state.time === this._settings.timeToEnd && this._state.answers.length < this._settings.lastScreen) {
      return TimerResult.TIME_OUT;
    }

    if (this._state.time === this._settings.timeToAlarm) {
      return TimerResult.ALARM;
    }

    return TimerResult.TICK;
  }

  isGameContinued() {
    return this._state.mistakes < this._settings.maxMistakes &&
      this._state.question < this._settings.lastScreen;
  }

  upQuestion() {
    this._state.question++;
  }

  getGameResult() {
    if (this._state.mistakes === this._settings.maxMistakes) {
      return ResultType.ATTEMPTS_OUT;
    }

    if (this._state.mistakes < this._settings.maxMistakes &&
      this._state.question === this._settings.lastScreen) {
      return ResultType.WIN;
    }

    return ``;
  }

  calcPoints() {
    let points = 0;
    for (const answer of this._state.answers) {
      points += answerPoints[answer];
    }
    return points;
  }

  calcAnswersType(type) {
    return this._state.answers.filter((el) => el === type).length;
  }

  checkAnswer(answer, time) {
    const answerType = GameModel.getAnswerType(answer, time);
    this._addAnswer(answerType);
    this._checkMistake();
  }

  calcRoundTime(startTime) {
    return startTime - this._state.time;
  }

  static getWinnerStatistic(userPoints, otherResults) {
    const winners = otherResults.
        slice(0).
        sort((prev, next) => next.points - prev.points);

    let position = winners.length + 1;

    for (let i = 0; i < otherResults.length; i++) {
      if (winners[i].points < userPoints) {
        position = i + 1;
        break;
      }
    }

    const players = winners.length + 1;
    const percent = Math.round(((players - position) / players) * 100);

    return {position, players, percent};
  }

  static getAudioSources(data) {
    const sources = new Set();

    for (const it of data) {
      if (it.type === QuestionType.ARTIST) {
        sources.add(it.src);
      }

      if (it.type === QuestionType.GENRE) {
        for (const item of it.answers) {
          sources.add(item.src);
        }
      }
    }

    return [...sources];
  }

  static getAnswerType(isCorrect, time) {
    if (!isCorrect) {
      return AnswerType.WRONG;
    }
    return time <= FAST_ANSWER_TIME ?
      AnswerType.FAST :
      AnswerType.CORRECT;
  }

  static isGenreAnswerCorrect(answers, question) {
    if (!answers.length) {
      return false;
    }
    return answers.every((it) => it === question.genre);
  }

  static isArtistAnswerCorrect(answer, answerVariants) {
    const rightAnswer = answerVariants.find((it) => it.isCorrect).title;
    return answer === rightAnswer;
  }
}

export default GameModel;

