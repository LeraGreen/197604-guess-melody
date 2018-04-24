import getFirstScreen from '../first-screen/get-first-screen';
import getSecondScreen from '../second-screen/get-second-screen';
import {settings, currentState, initialState, statistics, upMistake, splitTime, checkAnswer} from '../data/game-data';
import {showScreen} from '../utils';
import getWinScreen from '../results/get-win-screen';
import getAttemptsOutScreen from '../results/get-attempts-out-screen';
import getTimeOutScreen from '../results/get-timeout-screen';

const screenType = {
  'artist': getFirstScreen,
  'genre': getSecondScreen
};

let screenTime = 0;

let timerId = null;

const showTimer = (rawTime) => {
  const time = splitTime(rawTime);
  const minutes = document.getElementById(`minutes`);
  const seconds = document.getElementById(`seconds`);
  minutes.textContent = time.minutes;
  seconds.textContent = time.seconds;
};

export const showGameScreen = (state, questions, answer) => {
  let roundTime = 0;
  if (screenTime) {
    roundTime = -(state.time - screenTime);
  }
  if (!timerId) {
    timerId = setInterval(() => {
      if (state.time > settings.timeToEnd) {
        state.time--;
        showTimer(state.time);
      } else if (state.time === settings.timeToEnd) {
        clearInterval(timerId);
      }
      if (state.time === settings.timeToEnd && state.question < settings.screens) {
        clearInterval(timerId);
        screenTime = 0;
        showScreen(getTimeOutScreen());
      }
    }, 1000);
  }

  const questionNumber = state.question;
  const question = questions[questionNumber];
  if (answer) {
    state.answers.push(checkAnswer(answer, roundTime));
  }
  const lastAnswer = state.answers[state.answers.length - 1];

  if (lastAnswer === `wrong`) {
    upMistake(state);
  }
  if (state.mistakes < settings.maxMistakes && questionNumber < settings.screens && question) {
    showScreen(screenType[question.type](state, question));
    screenTime = state.time;
    state.question++;
  } else if (state.mistakes === settings.maxMistakes) {
    Object.assign(currentState, initialState);
    clearInterval(timerId);
    screenTime = 0;
    showScreen(getAttemptsOutScreen());
  } else if (state.mistakes < settings.maxMistakes && questionNumber === settings.screens) {
    clearInterval(timerId);
    screenTime = 0;
    showScreen(getWinScreen(currentState, statistics));
  }
  // TODO обавить проверку на время
  // TODO обнулять стейт после окончания игры
  // TODO НА ФИНАЛЬНЫХ ЭКРАНАХ МУТИТЬ МУТКИ
  // TODO Переписать тесты под новые функции и новые штуки в функциях
};

export const checkArtistScreen = (answer, question) => answer === question.artist;

export const checkGenreScreen = (answers, question) => {
  // TODO а что делать если правильный ответ пустой?
  // Написать битовые маскиииииииииииии уиииииииииии!
  if (!answers.length) {
    return false;
  }
  return answers.every((it) => it === question.genre);
};
