import StartGamePresenter from './presenters/start-game-presenter';
import Loader from './loader';
import GamePresenter from "./presenters/game-presenter";
import EndGame from "./presenters/game-end-presenter";
import GameModel from "./game-model/game-model";

export const ResultType = {
  TIME_OUT: `timeEnd`,
  WIN: `win`,
  ATTEMPTS_OUT: `attemptsOut`
};

let loader = null;
let gameModel = null;
const gamePresenter = new GamePresenter();
const startGamePresenter = new StartGamePresenter();

export const playGame = () => {
  gamePresenter.startGame();
};

export const endGame = (result) => {
  switch (result) {
    case ResultType.TIME_OUT:
      EndGame.showTimeOutScreen();
      break;
    case ResultType.ATTEMPTS_OUT:
      EndGame.showAttemptsOutScreen();
      break;
    case ResultType.WIN:
      Loader.loadStatistics().then((data) => {
        EndGame.onStatisticsLoad(gameModel, data);
      }).catch(() => {
        EndGame.onStatisticsLoad(gameModel);
      });
      break;
  }
};

export const startGame = () => {
  startGamePresenter.init();

  Loader.loadData().then((loadedData) => {
    gameModel = new GameModel(loadedData);
    gamePresenter.init(gameModel);
    return Loader.preloadAudio(loadedData);
  }).then(() => {
    startGamePresenter.showStart();
  });
};

export const saveStatistics = (points) => {
  Loader.sendStatistics(points);
};

startGame();
