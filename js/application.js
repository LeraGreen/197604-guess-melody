import GameModel from './game-model/game-model';
import Loader from './loader';
import StartGamePresenter from './presenters/start-game-presenter';
import GamePresenter from './presenters/game-presenter';
import EndGamePresenter from "./presenters/game-end-presenter";

export const ResultType = {
  TIME_OUT: `timeEnd`,
  WIN: `win`,
  ATTEMPTS_OUT: `attemptsOut`
};

class Application {
  constructor() {
    this._gameModel = null;
    this._gamePresenter = null;
    this._startGamePresenter = null;
  }

  playGame() {
    this._gamePresenter = new GamePresenter(this._gameModel);
    this._gamePresenter.startGame();
  }

  startGame() {
    this._startGamePresenter = new StartGamePresenter();
    this._startGamePresenter.init();

    Loader.loadData().then((loadedData) => {
      this._gameModel = new GameModel(loadedData);
      return Loader.preloadAudio(GameModel.getAudioSources(loadedData));
    }).then(() => {
      this._startGamePresenter.showStart();
    });
  }

  saveStatistics(points) {
    Loader.sendStatistics(points);
  }

  endGame(result) {
    switch (result) {
      case ResultType.TIME_OUT:
        EndGamePresenter.showTimeOutScreen();
        break;
      case ResultType.ATTEMPTS_OUT:
        EndGamePresenter.showAttemptsOutScreen();
        break;
      case ResultType.WIN:
        Loader.loadStatistics().then((data) => {
          EndGamePresenter.onStatisticsLoad(this._gameModel, data);
        }).catch(() => {
          EndGamePresenter.onStatisticsLoad(this._gameModel);
        });
        break;
    }
  }
}

export default new Application();
