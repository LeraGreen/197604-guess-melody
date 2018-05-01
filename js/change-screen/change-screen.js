import AuthorScreenView from '../author-screen/author-screen-view';
import GenreScreenView from '../genre-screen/genre-screen-view';
import {settings, currentState, initialState, statistics, upMistake, checkAnswer, questions, calcPoints, calcAnswersType, getWinnerStatistics, AnswerType} from '../data/game-data';
import {showScreen} from '../utils';
import WinScreenView from '../results/win-screen-view';
import AttemptsOutScreenView from '../results/attempts-out-screen-view';
import TimeOutScreenView from '../results/timeout-screen-view';
import GreetingScreenView from '../greeting/greeting-sreen-view';
import MistakesView from '../mistakes/mistakes-view';
import TimerGraphicView from '../timer/timer-graphic-view';
import TimerTextView from '../timer/timer-text-view';

// TODO а что делать если правильный ответ пустой?
// Написать битовые маскиииииииииииии уиииииииииии!
// TODO Переписать тесты под новые функции и новые штуки в функциях

const QuestionType = {
  ARTIST: `artist`,
  GENRE: `genre`
};

const screenType = {
  [QuestionType.ARTIST]: AuthorScreenView,
  [QuestionType.GENRE]: GenreScreenView
};

let timerGraphic = null;
let timerText = null;
let screenTime = 0;
let timerId = null;

export const initializeGame = () => {
  const greetingScreen = new GreetingScreenView();
  greetingScreen.onPlayButtonClick = () => {
    Object.assign(currentState, initialState, {
      answers: []
    });
    timerGraphic = new TimerGraphicView();
    timerText = new TimerTextView();
    showGameScreen(currentState);
  };
  showScreen(greetingScreen);
};

const updateTimer = (state) => {
  if (state.time > settings.timeToEnd) {
    timerText.showTime(state.time);
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
};

export const startTimer = (state) => {
  timerId = setInterval(() => {
    state.time--;
    updateTimer(state);
  }, 1000);
};

const stopTimer = () => {
  clearInterval(timerId);
  screenTime = 0;
  timerId = null;
};

export const showGameScreen = (state, answer) => {
  if (!timerId) {
    startTimer(state);
  }
  let roundTime = 0;
  if (screenTime) {
    roundTime = screenTime - state.time;
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
    // TODO Разобраться с передачей стейта, чтобы он явно менялся, а не отовсюду по ссылкам
    const questionScreen = new screenType[question.type](question);
    if (question.type === QuestionType.ARTIST) {
      questionScreen.onAnswersFormChange = function (input, screenQuestion) {
        if (input.name === `answer`) {
          showGameScreen(state, checkArtistScreen(input.value, screenQuestion));
        }
      };
    } else if (question.type === QuestionType.GENRE) {
      questionScreen.onAnswer = function (inputs) {
        const answers = inputs.elements.answer;
        const checkedAnswers = [];
        for (const it of answers) {
          if (it.checked) {
            checkedAnswers.push(it.value);
          }
        }
        showGameScreen(state, checkGenreScreen(checkedAnswers, question));
      };
    }

    questionScreen.append(timerGraphic);
    questionScreen.append(timerText);

    const mistakes = new MistakesView(state);
    mistakes.showMistakes(state.mistakes);
    questionScreen.append(mistakes);

    showScreen(questionScreen);

    updateTimer(state);
    screenTime = state.time;
    state.question++;
  } else if (state.mistakes === settings.maxMistakes) {
    stopTimer();
    const attemptsOutScreen = new AttemptsOutScreenView();
    attemptsOutScreen.onReplayButtonClick = initializeGame;
    showScreen(attemptsOutScreen);
  } else if (state.mistakes < settings.maxMistakes && questionNumber === settings.screens) {
    stopTimer();
    const points = calcPoints(state.answers);
    const fastAnswers = calcAnswersType(state.answers, AnswerType.FAST);
    const winnerStatistics = getWinnerStatistics(points, statistics);
    const gameTime = settings.timeToGame - state.time;
    const winScreen = new WinScreenView(currentState, statistics, points, fastAnswers, winnerStatistics, gameTime);
    winScreen.onReplayButtonClick = initializeGame;
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
