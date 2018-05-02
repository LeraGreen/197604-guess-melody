import {checkAnswer, initialState, settings} from "../data/game-data";

export class GameModel {
  constructor() {
    this._state = {};
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
    if (this._state.time > settings.timeToEnd) {
      this.onTick();
    } else if (this._state.time === settings.timeToEnd && this._state.answers.length < settings.screens) {
      // TODO разобраться почему убирание отсюда stopTimer ломает нахер все
      // раньше он был в инитиалайз гейм
      this.onTimeEnd();
    }
  }

  onTick() {
  }

  onTimeEnd() {
  }

  calcRoundTime(screenTime) {
    this._roundTime = screenTime - this._state.time;
  }

  addAnswer(answer) {
    if (typeof answer !== `undefined`) {
      this._state.answers.push(checkAnswer(answer, this._roundTime));
    }
  }
}
