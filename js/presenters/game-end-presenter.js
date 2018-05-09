import TimeOutScreenView from './../game-views/results/timeout-screen-view';
import AttemptsOutScreenView from './../game-views/results/attempts-out-screen-view';
import WinScreenView from './../game-views/results/win-screen-view';
import {showScreen} from '../utils';
import {startGame, saveStatistics} from '../main';
import {AnswerType} from './../data/game-data';
import GameModel from '../game-model/game-model';
// todo проверить кавычки вебшторма

class EndGame {
  static showAttemptsOutScreen() {
    const attemptsOutScreen = new AttemptsOutScreenView();
    attemptsOutScreen.onReplayButtonClick = () => {
      startGame();
    };
    showScreen(attemptsOutScreen);
  }

  static showTimeOutScreen() {
    const timeOutScreen = new TimeOutScreenView();
    timeOutScreen.onReplayButtonClick = () => {
      startGame();
    };
    showScreen(timeOutScreen);
  }

  static onStatisticsLoad(model, data = null) {
    const points = model.calcPoints();

    // todo проверить методы чо там у них
    const fastAnswers = model.calcAnswersType(AnswerType.FAST);
    const mistakes = model.mistakes;
    const gameTime = model.gameTime - model.time;
    const winnerStatistics = data ?
      GameModel.getWinnerStatistic(points, data) :
      null;

    this._winScreen = new WinScreenView(points, fastAnswers, mistakes, gameTime, winnerStatistics);
    this._winScreen.onReplayButtonClick = () => {
      startGame();
    };
    showScreen(this._winScreen);

    saveStatistics(points);
  }
}


export default EndGame;
