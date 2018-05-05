import {answerPoints, initialState, settings, FAST_ANSWER_TIME, AnswerType} from "../data/game-data";

class GameModel {
  constructor(questions) {
    this._state = {};
    this._questions = questions;
    this._question = null;
    this._settings = Object.assign({}, settings, {
      screens: 3
      // screens: this._questions.length
    });
  }

  static getWinnerStatistic(userPoints, otherResults) {
    const winners = otherResults
        .map((it) => it.points)
        .sort((prev, next) => next - prev);
    const winnersQuantity = winners.length;
    let userPosition;
    for (let i = 0; i < otherResults.length; i++) {
      if (winners[i] < userPoints) {
        winners.splice(i, 0, userPoints);
        userPosition = i + 1;
        break;
      }
    }

    if (winners.length === winnersQuantity) {
      winners.push(userPoints);
      userPosition = winners.length;
    }
    const percent = Math.round(((winners.length - userPosition) / winners.length) * 100);
    return {position: userPosition, players: winners.length, percent};
  }

  static getAnswerType(answer, time) {
    let type = AnswerType.WRONG;
    if (answer) {
      if (time <= FAST_ANSWER_TIME) {
        type = AnswerType.FAST;
      } else {
        type = AnswerType.CORRECT;
      }
    }
    return type;
  }

  static checkGenreScreen(answers, question) {
    if (!answers.length) {
      return false;
    }
    return answers.every((it) => it === question.genre);
  }

  static checkArtistScreen(answer, answerVariants) {
    const rightAnswer = answerVariants.find((it) => it.isCorrect).title;
    return answer === rightAnswer;
  }

  get question() {
    return this._questions[this._state.question];
  }

  get mistakes() {
    return this._state.mistakes;
  }

  get time() {
    return this._state.time;
  }

  get questionType() {
    return this._question.type;
  }

  get gameTime() {
    return this._settings.timeToGame;
  }

  resetState() {
    Object.assign(this._state, initialState, {
      answers: []
    });
  }

  tickTimer() {
    this._state.time--;
  }

  checkTimer() {
    if (this._state.time === this._settings.timeToAlarm) {
      this.onAlarm();
    }
    if (this._state.time > this._settings.timeToEnd) {
      this.onTick(this._state.time);
    } else if (this._state.time === this._settings.timeToEnd && this._state.answers.length < this._settings.screens) {
      this.onTimeEnd();
    }
  }

  onTick() {
  }

  onTimeEnd() {
  }

  onAlarm() {
  }

  addAnswer(answer) {
    this._state.answers.push(answer);
  }

  isGameContinued() {
    const questionNumber = this._state.question;
    this._question = this._questions[questionNumber];
    return (this._state.mistakes < this._settings.maxMistakes && questionNumber < this._settings.screens && this._question);
  }

  upQuestion() {
    this._state.question++;
  }

  isAttemptsOut() {
    return this._state.mistakes === this._settings.maxMistakes;
  }

  isUserWin() {
    const questionNumber = this._state.question;
    return (this._state.mistakes < this._settings.maxMistakes && questionNumber === this._settings.screens);
  }

  checkMistake() {
    const lastAnswer = this._state.answers[this._state.answers.length - 1];
    if (lastAnswer === AnswerType.WRONG) {
      this.upMistake();
    }
  }

  upMistake() {
    if (this._state.mistakes < this._settings.maxMistakes) {
      this._state.mistakes++;
    }
  }

  calcPoints() {
    let points = 0;
    for (const answer of this._state.answers) {
      points += answerPoints[answer];
    }
    if (points < 0) {
      points = -1;
    }
    return points;
  }

  calcAnswersType(type) {
    return (this._state.answers.filter((el) => el === type).length);
  }

  checkAnswer(answer, time) {
    if (typeof answer !== `undefined`) {
      const answerType = GameModel.getAnswerType(answer, time);
      this.addAnswer(answerType);
      this.checkMistake();
    }
  }

  calcRoundTime(startTime) {
    return startTime - this._state.time;
  }
}

export default GameModel;

