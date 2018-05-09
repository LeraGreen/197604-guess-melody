import TimeOutScreenView from '../views/result-screens/timeout-screen-view';
import AttemptsOutScreenView from '../views/result-screens/attempts-out-screen-view';
import WinScreenView from '../views/result-screens/win-screen-view';
import {showScreen} from '../utils';
import {AnswerType} from '../game-data/game-data';
import GameModel from '../game-model/game-model';
import application from '../application';

class GameEndPresenter {
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

    const winScreen = new WinScreenView(points, fastAnswers, mistakes, gameTime, winnerStatistics);
    winScreen.onReplayButtonClick = () => {
      application.startGame();
    };
    showScreen(winScreen);

    application.saveStatistics(points);
  }
}


export default GameEndPresenter;
