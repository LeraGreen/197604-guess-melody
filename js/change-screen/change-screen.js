import AuthorScreenView from '../author-screen/author-screen-view';
import GenreScreenView from '../genre-screen/genre-screen-view';
import {settings, currentState, initialState, statistics, upMistake, splitTime, checkAnswer, questions} from '../data/game-data';
import {showScreen} from '../utils';
import WinScreenView from '../results/win-screen-view';
import AttemptsOutScreenView from '../results/attempts-out-screen-view';
import TimeOutScreenView from '../results/timeout-screen-view';
import GreetingScreenView from '../greeting/greeting-sreen-view';
import HeaderView from '../header/header';
import TimerGraphicView from '../timer/timer-graphic-view';
import TimerTimeView from '../timer/timer-time-view';

// TODO а что делать если правильный ответ пустой?
// Написать битовые маскиииииииииииии уиииииииииии!
// TODO Переписать тесты под новые функции и новые штуки в функциях

const screenType = {
  'artist': AuthorScreenView,
  'genre': GenreScreenView
};

let screenTime = 0;
let timerId = null;

export const initializeGame = () => {
  const greetingScreen = new GreetingScreenView();
  greetingScreen.onPlayButtonClick = () => {
    Object.assign(currentState, initialState, {
      answers: []
    });
    showGameScreen(currentState);
  };
  showScreen(greetingScreen);
};

export const workTimer = (state) => {
  // TODO разобраться с показом времени - показ с 5 секунд
  // TODO показыает 0 секунд, а потом показывает экран
  timerId = setInterval(() => {
    if (state.time > settings.timeToEnd) {
      state.time--;
      showTimer(state.time);
    } else if (state.time === settings.timeToEnd && state.answers.length < settings.screens) {
      // TODO разобраться почему убирание отсюда stopTimer ломает нахер все
      // раньше он был в инитиалайз гейм
      stopTimer();
      const timeOutScreen = new TimeOutScreenView();
      timeOutScreen.onReplayButtonClick = function () {
        initializeGame();
      };
      showScreen(timeOutScreen);
    }
  }, 1000);
};

const showTimer = (rawTime) => {
  const time = splitTime(rawTime);
  const minutes = document.getElementById(`minutes`);
  const seconds = document.getElementById(`seconds`);
  minutes.textContent = time.minutes >= 10 ? time.minutes : `0` + time.minutes;
  seconds.textContent = time.seconds >= 10 ? time.seconds : `0` + time.seconds;
};

const stopTimer = () => {
  clearInterval(timerId);
  screenTime = 0;
  timerId = null;
};

export const showGameScreen = (state, answer) => {
  // TODO мэйби выпилить передачу questions внутрь, ибо они итак есть наверху
  if (!timerId) {
    workTimer(state);
  }
  let roundTime = 0;
  if (screenTime) {
    roundTime = -(state.time - screenTime);
  }

  const questionNumber = state.question;
  const question = questions[questionNumber];
  if (typeof answer !== `undefined`) {
    state.answers.push(checkAnswer(answer, roundTime));
  }
  const lastAnswer = state.answers[state.answers.length - 1];

  if (lastAnswer === `wrong`) {
    upMistake(state);
  }

  if (state.mistakes < settings.maxMistakes && questionNumber < settings.screens && question) {
    const questionScreen = new screenType[question.type](state, question);
    if (question.type === `artist`) {
      questionScreen.onAnswersFormChange = function (input, question) {
        if (input.name === `answer`) {
          showGameScreen(state, checkArtistScreen(input.value, question));
        }
      };
    } else if (question.type === `genre`) {
      questionScreen.onConfirmAnswers = function (inputs) {
        const answers = inputs.elements.answer;
        const checkedAnswers = [];
        for (const answer of answers) {
          if (answer.checked) {
            checkedAnswers.push(answer.value);
          }
        }
        showGameScreen(this.state, checkGenreScreen(checkedAnswers, question));
      };
    }

    const header = new HeaderView(state);
    header.renderMistakes(state.mistakes);
    const timerTimeView = new TimerTimeView();
    const timerGraphicView = new TimerGraphicView();
    header.append(timerTimeView);
    header.append(timerGraphicView);
    questionScreen.append(header);
    showScreen(questionScreen);
    screenTime = state.time;
    state.question++;
  } else if (state.mistakes === settings.maxMistakes) {
    stopTimer();
    const attemptsOutScreen = new AttemptsOutScreenView();
    attemptsOutScreen.onReplayButtonClick = function () {
      initializeGame();
    };
    showScreen(attemptsOutScreen);
  } else if (state.mistakes < settings.maxMistakes && questionNumber === settings.screens) {
    stopTimer();
    const winScreen = new WinScreenView(currentState, statistics);
    winScreen.onReplayButtonClick = function () {
      initializeGame();
    };
    showScreen(winScreen);
  }
};

const checkArtistScreen = (answer, question) => answer === question.artist;

const checkGenreScreen = (answers, question) => {
  if (!answers.length) {
    return false;
  }
  return answers.every((it) => it === question.genre);
};
