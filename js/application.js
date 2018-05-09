import GameModel, {ResultType} from './game-model/game-model';
import Loader from './loader';
import GameStartPresenter from './presenters/game-start-presenter';
import GamePresenter from './presenters/game-presenter';
import GameEndPresenter from "./presenters/game-end-presenter";

class Application {
  constructor() {
    this._gameModel = null;
  }

  playGame() {
    const gamePresenter = new GamePresenter(this._gameModel);
    gamePresenter.startGame();
  }

  startGame() {
    const startGamePresenter = new GameStartPresenter();
    startGamePresenter.init();

    Loader.loadData().then((loadedData) => {
      this._gameModel = new GameModel(loadedData);
      return Loader.preloadAudio(GameModel.getAudioSources(loadedData));
    }).then(() => {
      startGamePresenter.showStart();
    }).catch(() => {});
  }

  endGame(result) {
    switch (result) {
      case ResultType.TIME_OUT:
        GameEndPresenter.showTimeOutScreen();
        break;
      case ResultType.ATTEMPTS_OUT:
        GameEndPresenter.showAttemptsOutScreen();
        break;
      case ResultType.WIN:
        Loader.loadStatistics().then((data) => {
          GameEndPresenter.onStatisticsLoad(this._gameModel, data);
        }).catch(() => {
          GameEndPresenter.onStatisticsLoad(this._gameModel);
        });
        break;
    }
  }

  saveStatistics(points) {
    Loader.sendStatistics(points);
  }
}

export default new Application();
