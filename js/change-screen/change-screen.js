import AuthorScreenView from '../author-screen/author-screen-view';
import GenreScreenView from '../genre-screen/genre-screen-view';
import {settings, statistics, upMistake, checkAnswer, questions, calcPoints, calcAnswersType, getWinnerStatistics, AnswerType} from '../data/game-data';
import {showScreen} from '../utils';
import WinScreenView from '../results/win-screen-view';
import AttemptsOutScreenView from '../results/attempts-out-screen-view';
import TimeOutScreenView from '../results/timeout-screen-view';
import GreetingScreenView from '../greeting/greeting-sreen-view';
import MistakesView from '../mistakes/mistakes-view';
import TimerGraphicView from '../timer/timer-graphic-view';
import TimerTextView from '../timer/timer-text-view';
import {GameModel} from '../game-model/game-model';

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

// TODO назвать GamePresenter
export class GameScreen {
  constructor() {
    this._screenTime = 0;
    this._timerId = null;
    this._roundTime = null;
    this._state = {};
    this.gameModel = new GameModel();
    this.gameModel.onTick = () => {
      this._timerText.showTime(this._state.time);
    };
    this.gameModel.onTimeEnd = () => {
      this.stopTimer();
      this.showTimeOutScreen();
    };
  }

  init() {
    this._greetingScreen = new GreetingScreenView();
    this._greetingScreen.onPlayButtonClick = () => {
      this.gameModel.resetState();
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
    this.gameModel.calcRoundTime(this._screenTime);
    this.gameModel.addAnswer(answer);
    this.checkMistake();

    const questionNumber = this._state.question;
    this._question = questions[questionNumber];

    if (this._state.mistakes < settings.maxMistakes && questionNumber < settings.screens && this._question) {
      this.questionScreen = new screenType[this._question.type](this._question);
      if (this._question.type === QuestionType.ARTIST) {
        this.bindArtistScreen();
      } else if (this._question.type === QuestionType.GENRE) {
        this.bindGenreScreen();
      }

      this.showTimer();
      this.showMistakes();

      showScreen(this.questionScreen);
      this._screenTime = this._state.time;
      this._state.question++;
    } else if (this._state.mistakes === settings.maxMistakes) {
      this.stopTimer();
      this.showAttemptsOutScreen();
    } else if (this._state.mistakes < settings.maxMistakes && questionNumber === settings.screens) {
      this.stopTimer();
      this.showWinScreen();
    }
  }

  startTimer() {
    this._timerId = setInterval(() => {
      this.gameModel.tickTimer();
      this.gameModel.checkTimer();
    }, 1000);
  }

  stopTimer() {
    clearInterval(this._timerId);
    this._screenTime = 0;
    this._timerId = null;
  }

  checkMistake() {
    const lastAnswer = this._state.answers[this._state.answers.length - 1];

    if (lastAnswer === `wrong`) {
      upMistake(this._state);
    }
  }

  bindArtistScreen() {
    this.questionScreen.onAnswersFormChange = (input, screenQuestion) => {
      if (input.name === `answer`) {
        this.showGameScreen(checkArtistScreen(input.value, screenQuestion));
      }
    };
  }

  bindGenreScreen() {
    this.questionScreen.onAnswer = (inputs) => {
      const answers = inputs.elements.answer;
      const checkedAnswers = [];
      for (const it of answers) {
        if (it.checked) {
          checkedAnswers.push(it.value);
        }
      }
      this.showGameScreen(checkGenreScreen(checkedAnswers, this._question));
    };
  }

  showTimer() {
    this.questionScreen.append(this._timerGraphic);
    this.questionScreen.append(this._timerText);
  }

  showMistakes() {
    const mistakes = new MistakesView();
    mistakes.showMistakes(this._state.mistakes);
    this.questionScreen.append(mistakes);
  }

  showAttemptsOutScreen() {
    const attemptsOutScreen = new AttemptsOutScreenView();
    attemptsOutScreen.onReplayButtonClick = () => {
      this.init();
    };
    showScreen(attemptsOutScreen);
  }

  showWinScreen() {
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

  showTimeOutScreen() {
    const timeOutScreen = new TimeOutScreenView();
    timeOutScreen.onReplayButtonClick = () => {
      this.init();
    };
    showScreen(timeOutScreen);
  }

}
