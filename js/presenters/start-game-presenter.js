import GreetingScreenView from '../game-views/greeting/greeting-screen-view';
import {showScreen} from '../utils';
import application from '../application';

class StartGamePresenter {
  constructor() {
    this._greetingScreen = null;
  }

  init() {
    this._greetingScreen = new GreetingScreenView();
    this._greetingScreen.onPlayButtonClick = () => {
      application.playGame();
    };
    showScreen(this._greetingScreen);
  }

  showStart() {
    this._greetingScreen.enableStartGameButton();
  }
}

export default StartGamePresenter;
