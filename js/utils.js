import getFirstScreen from './first-screen/get-first-screen';
import getSecondScreen from './second-screen/get-second-screen';
import {settings, initialState, currentState} from './data/game-data';

const screenType = {
  'artist': getFirstScreen,
  'genre': getSecondScreen
};

const appContainer = document.querySelector(`.app`);

export const getElementFromTemplate = (string) => {
  const template = document.createElement(`template`);
  template.innerHTML = string;
  return template.content.children[0];
};

export const showScreen = (element) => {
  const mainClass = `.main`;
  const main = appContainer.querySelector(mainClass);
  if (main) {
    appContainer.removeChild(main);
  }
  appContainer.insertBefore(element, appContainer.children[0]);
};

export const getRandomFromArray = (array) => array[Math.floor(Math.random() * array.length)];

export const showGameScreen = (state, questions) => {
  const questionNumber = state.question;
  const question = questions[questionNumber];
  if (state.question < settings.screens && question) {
    showScreen(screenType[question.type](state, question));
    state.question++;
  } else {
    console.log(`шеф, все пропало`);
  }
};
