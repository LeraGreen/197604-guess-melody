import {showScreen} from './utils';
import GreetingScreenView from './greeting/greeting-sreen-view';
import {initialState, currentState, questions} from './data/game-data';
import {showGameScreen} from './change-screen/change-screen';

const greetingScreen = new GreetingScreenView();
greetingScreen.startGame = () => {
  Object.assign(currentState, initialState, {
    answers: []
  });
  showGameScreen(currentState, questions);
};
showScreen(greetingScreen.element);
