import FirstScreenView from '../first-screen/first-screen-view';
import SecondScreenView from '../second-screen/second-screen-view';
import {settings, currentState, initialState, statistics, upMistake, splitTime, checkAnswer} from '../data/game-data';
import {showScreen} from '../utils';
import WinScreenView from '../results/win-screen-view';
import AttemptsOutScreenView from '../results/attempts-out-screen-view';
import TimeOutScreenView from '../results/timeout-screen-view';
import GreetingScreenView from '../greeting/greeting-sreen-view';

const screenType = {
  'artist': FirstScreenView,
  'genre': SecondScreenView
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
        const timeOutScreen = new TimeOutScreenView();
        timeOutScreen.showGreetingScreen = () => {
          const greetingScreen = new GreetingScreenView();
          showScreen(greetingScreen.element);
        };
        showScreen(timeOutScreen.element);
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
    const questionScreen = new screenType[question.type](state, question);
    showScreen(questionScreen.element);
    screenTime = state.time;
    state.question++;
  } else if (state.mistakes === settings.maxMistakes) {
    Object.assign(currentState, initialState, {
      answers: []
    });
    clearInterval(timerId);
    screenTime = 0;
    const attemptsOutScreen = new AttemptsOutScreenView();
    attemptsOutScreen.showGreetingScreen = () => {
      const greetingScreen = new GreetingScreenView();
      showScreen(greetingScreen.element);
    };
    showScreen(attemptsOutScreen.element);
  } else if (state.mistakes < settings.maxMistakes && questionNumber === settings.screens) {
    clearInterval(timerId);
    screenTime = 0;
    const winScreen = new WinScreenView(currentState, statistics);
    winScreen.showGreetingScreen = () => {
      const greetingScreen = new GreetingScreenView();
      showScreen(greetingScreen.element);
    };
    showScreen(winScreen.element);
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
