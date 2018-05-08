import Loader from './loader';
import GamePresenter from "./game-presenter/game-presenter";

// TODO: Переписать на промисы
const startGame = () => {
  let presenter = new GamePresenter();
  let data = null;
  const loader = new Loader();

  loader.onDataLoad = (loadedData) => {
    data = loadedData;
    loader.preloadAudio(loadedData);
  };

  loader.onAudioPreload = () => {
    presenter.startGame(data);
  };

  presenter.init();
  loader.loadData();
};

startGame();

export default startGame;
