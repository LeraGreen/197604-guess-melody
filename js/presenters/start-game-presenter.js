import GreetingScreenView from "../game-views/greeting/greeting-screen-view";
import {showScreen} from "../utils";
import {playGame} from "../main";

class StartGamePresenter {
  constructor() {
    this._greetingScreen = null;
  }
  init() {
    this._greetingScreen = new GreetingScreenView();
    this._greetingScreen.onPlayButtonClick = () => {
      playGame();
    };
    showScreen(this._greetingScreen);
  }

  showStart() {
    this._greetingScreen.enableStartGameButton();
  }
}

export default StartGamePresenter;
