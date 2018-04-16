import getFirstScreen from './first-screen/get-first-screen';
import getSecondScreen from './second-screen/get-second-screen';
import {settings, initialState, currentState, upMistake} from './data/game-data';

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
  const answer = state.answers[state.answers.length - 1];
  const question = questions[questionNumber];

  if (answer && answer === `wrong`) {
    upMistake(state);
  }
  
  if (state.mistakes < settings.maxMistakes && questionNumber < settings.screens && question) {
    showScreen(screenType[question.type](state, question));
    state.question++;
  } else {
    console.log(`шеф, все пропало`);
  }
};

export const checkRightAnswer = (answer, question) => question.type === `artist` ? checkArtistScreen(answer, question) : checkGenreScreen(answer, question);


const checkArtistScreen = (answer, question) => answer === question.artist;

const checkGenreScreen = (answers, question) => answers.every((it) => it === question.genre);
