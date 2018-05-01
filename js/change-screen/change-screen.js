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

const checkArtistScreen = (answer, question) => answer === question.artist;

const checkGenreScreen = (answers, question) => {
  if (!answers.length) {
    return false;
  }
  return answers.every((it) => it === question.genre);
};

export class GameScreen {
  constructor() {
    this._timerGraphic = null;
    this._timerText = null;
    this._screenTime = 0;
    this._timerId = null;
    this._roundTime = null;
    this._state = {};
  }

  init() {
    this._greetingScreen = new GreetingScreenView();
    this._greetingScreen.onPlayButtonClick = () => {
      Object.assign(this._state, initialState, {
        answers: []
      });
      this._timerGraphic = new TimerGraphicView();
      this._timerText = new TimerTextView();
      this.showGameScreen();
    };
    showScreen(this._greetingScreen);
  }


  showGameScreen(answer) {
    if (!this._timerId) {
      this.startTimer();
    }
    this.calcRoundTime();
    if (typeof answer !== `undefined`) {
      this._state.answers.push(checkAnswer(answer, this._roundTime));
    }
    this.checkMistake();
    const questionNumber = this._state.question;
    const question = questions[questionNumber];
    if (this._state.mistakes < settings.maxMistakes && questionNumber < settings.screens && question) {
      // TODO Разобраться с передачей стейта, чтобы он явно менялся, а не отовсюду по ссылкам
      const questionScreen = new screenType[question.type](question);
      if (question.type === QuestionType.ARTIST) {
        questionScreen.onAnswersFormChange = (input, screenQuestion) => {
          if (input.name === `answer`) {
            this.showGameScreen(checkArtistScreen(input.value, screenQuestion));
          }
        };
      } else if (question.type === QuestionType.GENRE) {
        questionScreen.onAnswer = (inputs) => {
          const answers = inputs.elements.answer;
          const checkedAnswers = [];
          for (const it of answers) {
            if (it.checked) {
              checkedAnswers.push(it.value);
            }
          }
          this.showGameScreen(checkGenreScreen(checkedAnswers, question));
        };
      }

      questionScreen.append(this._timerGraphic);
      questionScreen.append(this._timerText);

      const mistakes = new MistakesView();
      mistakes.showMistakes(this._state.mistakes);
      questionScreen.append(mistakes);
      showScreen(questionScreen);

      this.updateTimer(this._state);
      this._screenTime = this._state.time;
      this._state.question++;
    } else if (this._state.mistakes === settings.maxMistakes) {
      this.stopTimer();
      const attemptsOutScreen = new AttemptsOutScreenView();
      attemptsOutScreen.onReplayButtonClick = () => {
        this.init();
      };
      showScreen(attemptsOutScreen);
    } else if (this._state.mistakes < settings.maxMistakes && questionNumber === settings.screens) {
      this.stopTimer();
      const points = calcPoints(this._state.answers);
      const fastAnswers = calcAnswersType(this._state.answers, AnswerType.FAST);
      const winnerStatistics = getWinnerStatistics(points, statistics);
      const gameTime = settings.timeToGame - this._state.time;
      const winScreen = new WinScreenView(this._state, points, fastAnswers, winnerStatistics, gameTime);
      winScreen.onReplayButtonClick = () => {
        this.init();
      };
      showScreen(winScreen);
    }
  }

  updateTimer() {
    if (this._state.time > settings.timeToEnd) {
      this._timerText.showTime(this._state.time);
    } else if (this._state.time === settings.timeToEnd && this._state.answers.length < settings.screens) {
      // TODO разобраться почему убирание отсюда stopTimer ломает нахер все
      // раньше он был в инитиалайз гейм
      this.stopTimer();
      const timeOutScreen = new TimeOutScreenView();
      timeOutScreen.onReplayButtonClick = () => {
        this.init();
      };
      showScreen(timeOutScreen);
    }
  }

  startTimer() {
    this._timerId = setInterval(() => {
      this._state.time--;
      this.updateTimer(this._state);
    }, 1000);
  }

  stopTimer() {
    clearInterval(this._timerId);
    this._screenTime = 0;
    this._timerId = null;
  }

  calcRoundTime() {
    this._roundTime = 0;
    if (this._screenTime) {
      this._roundTime = this._screenTime - this._state.time;
    }
  }

  checkMistake() {
    const lastAnswer = this._state.answers[this._state.answers.length - 1];

    if (lastAnswer === `wrong`) {
      upMistake(this._state);
    }
  }
}
