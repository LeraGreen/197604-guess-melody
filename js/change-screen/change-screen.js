import getFirstScreen from '../first-screen/get-first-screen';
import getSecondScreen from '../second-screen/get-second-screen';
import {settings, currentState, initialState, statistics, upMistake} from '../data/game-data';
import {showScreen} from '../utils';
import getWinScreen from '../results/get-win-screen';
import getAttemptsOutScreen from '../results/get-attempts-out-screen';
// import getTimeOutScreen from '../results/get-timeout-screen';

const screenType = {
  'artist': getFirstScreen,
  'genre': getSecondScreen
};

export const showGameScreen = (state, questions) => {
  const questionNumber = state.question;
  const question = questions[questionNumber];
  const answer = state.answers[state.answers.length - 1];

  if (answer === `wrong`) {
    upMistake(state);
  }
  if (state.mistakes < settings.maxMistakes && questionNumber < settings.screens && question) {
    showScreen(screenType[question.type](state, question));
    state.question++;
  } else if (state.mistakes === settings.maxMistakes) {
    Object.assign(currentState, initialState);
    showScreen(getAttemptsOutScreen());
  } else if (state.mistakes < settings.maxMistakes && questionNumber === settings.screens) {
    showScreen(getWinScreen(currentState, statistics));
  } else {
    console.log(`шеф, всё пропало`);
  }
  // добавить проверку на время
};

export const checkArtistScreen = (answer, question) => answer === question.artist;

export const checkGenreScreen = (answers, question) => answers.every((it) => it === question.genre);
