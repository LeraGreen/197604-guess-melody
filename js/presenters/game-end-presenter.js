import TimeOutScreenView from './../game-views/results/timeout-screen-view';
import AttemptsOutScreenView from './../game-views/results/attempts-out-screen-view';
import WinScreenView from './../game-views/results/win-screen-view';
import {showScreen} from '../utils';
import {AnswerType} from './../data/game-data';
import GameModel from '../game-model/game-model';
import application from '../application';

class EndGamePresenter {
  static showAttemptsOutScreen() {
    const attemptsOutScreen = new AttemptsOutScreenView();
    attemptsOutScreen.onReplayButtonClick = () => {
      application.startGame();
    };
    showScreen(attemptsOutScreen);
  }

  static showTimeOutScreen() {
    const timeOutScreen = new TimeOutScreenView();
    timeOutScreen.onReplayButtonClick = () => {
      application.startGame();
    };
    showScreen(timeOutScreen);
  }

  static onStatisticsLoad(model, data = null) {
    const points = model.calcPoints();
    const fastAnswers = model.calcAnswersType(AnswerType.FAST);
    const mistakes = model.mistakes;
    const gameTime = model.gameTime - model.time;
    const winnerStatistics = data ?
      GameModel.getWinnerStatistic(points, data) :
      null;

    this._winScreen = new WinScreenView(points, fastAnswers, mistakes, gameTime, winnerStatistics);
    this._winScreen.onReplayButtonClick = () => {
      application.startGame();
    };
    showScreen(this._winScreen);

    application.saveStatistics(points);
  }
}


export default EndGamePresenter;
