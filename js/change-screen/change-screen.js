import FirstScreenView from '../first-screen/first-screen-view';
import SecondScreenView from '../second-screen/second-screen-view';
import {settings, currentState, initialState, statistics, upMistake, splitTime, checkAnswer, questions} from '../data/game-data';
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
  // TODO мэйби выпилить передачу questions внутрь, ибо они итак есть наверху
  // TODO добавить время повторно, оно не отображается во второй раз
  let roundTime = 0;
  if (screenTime) {
    roundTime = -(state.time - screenTime);
  }
  if (!timerId) {
    // запуск таймера и отлов окончания времени
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
        timeOutScreen.onReplayButtonClick = function () {
          initializeGame();
        };
        showScreen(timeOutScreen.element);
      }
    }, 1000);
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
      // переопределение методов первого экрана
      questionScreen.onPlayerControlClick = function (button, audio) {
        if (audio.paused) {
          audio.play();
          button.classList.remove(`player-control--play`);
          button.classList.add(`player-control--pause`);
        } else if (!audio.paused) {
          audio.pause();
          button.classList.remove(`player-control--pause`);
          button.classList.add(`player-control--play`);
        }
      };
      questionScreen.onAnswersFormChange = function (input, questions, question) {
        if (input.name === `answer`) {
          showGameScreen(state, questions, checkArtistScreen(input.value, question));
        }
      };
    } else if (question.type === `genre`) {
      // переопределение методов второго экрана
      questionScreen.onFormSubmit = function (inputs, question) {
        const answers = inputs.elements.answer;
        const checkedAnswers = [];
        for (const answer of answers) {
          if (answer.checked) {
            checkedAnswers.push(answer.value);
          }
        }
        showGameScreen(this.state, questions, checkGenreScreen(checkedAnswers, question));
      };

      questionScreen.onPlayerControlClick = function (player, button, audio) {
        if (!audio.paused) {
          if (questionScreen.activePlayer) {
            questionScreen.activePlayer = null;
          }
          audio.pause();
          button.classList.add(`player-control--play`);
          button.classList.remove(`player-control--pause`);
        } else if (audio.paused) {
          if (questionScreen.activePlayer) {
            const activeSong = questionScreen.activePlayer.querySelector(`audio`);
            const activeButton = questionScreen.activePlayer.querySelector(`button`);
            activeSong.pause();
            activeButton.classList.add(`player-control--play`);
            activeButton.classList.remove(`player-control--pause`);
          }
          questionScreen.activePlayer = player;
          audio.play();
          button.classList.remove(`player-control--play`);
          button.classList.add(`player-control--pause`);
        }
      };
    }

    // показ игрового экрана
    showScreen(questionScreen.element);
    screenTime = state.time;
    state.question++;
  } else if (state.mistakes === settings.maxMistakes) {
    clearInterval(timerId);
    screenTime = 0;
    const attemptsOutScreen = new AttemptsOutScreenView();
    attemptsOutScreen.onReplayButtonClick = function () {
      initializeGame();
    };
    showScreen(attemptsOutScreen.element);
  } else if (state.mistakes < settings.maxMistakes && questionNumber === settings.screens) {
    clearInterval(timerId);
    screenTime = 0;
    const winScreen = new WinScreenView(currentState, statistics);
    winScreen.onReplayButtonClick = function () {
      initializeGame();
    };
    showScreen(winScreen.element);
  }
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

export const initializeGame = () => {
  const greetingScreen = new GreetingScreenView();
  greetingScreen.onPlayButtonClick = () => {
    Object.assign(currentState, initialState, {
      answers: []
    });
    if (timerId) {
      clearInterval(timerId);
    }
    showGameScreen(currentState, questions);
  };
  showScreen(greetingScreen.element);
};
