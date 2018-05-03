import ArtistScreenView from '../game-views/artist-screen/artist-screen-view';
import GenreScreenView from '../game-views/genre-screen/genre-screen-view';
import {statistics, AnswerType} from '../data/game-data';
import {showScreen} from '../utils';
import WinScreenView from '../game-views/results/win-screen-view';
import AttemptsOutScreenView from '../game-views/results/attempts-out-screen-view';
import TimeOutScreenView from '../game-views/results/timeout-screen-view';
import GreetingScreenView from '../game-views/greeting/greeting-sreen-view';
import MistakesView from '../game-views/mistakes/mistakes-view';
import TimerGraphicView from '../game-views/timer/timer-graphic-view';
import TimerTextView from '../game-views/timer/timer-text-view';
import {GameModel} from '../game-model/game-model';

// TODO может сделать папку gameviews и положить туда все вьюхи
// TODO а что делать если правильный ответ пустой?
// Написать битовые маскиииииииииииии уиииииииииии!
// TODO Переписать тесты под новые функции и новые штуки в функциях

const QuestionType = {
  ARTIST: `artist`,
  GENRE: `genre`
};

const screenType = {
  [QuestionType.ARTIST]: ArtistScreenView,
  [QuestionType.GENRE]: GenreScreenView
};

export class GamePresenter {
  constructor() {
    this._greetingScreen = null;
    this._questionScreen = null;
    this._timerId = null;
    this._timerGraphic = null;
    this._timerText = null;
    this._screenTime = null;
    this._timeOutScreen = null;
    this._attemptsOutScreen = null;
    this._winScreen = null;
    this._gameModel = new GameModel();
    this._gameModel.onTick = (time) => {
      this._timerText.showTime(time);
    };
    this._gameModel.onTimeEnd = () => {
      this._stopTimer();
      this._timeOutScreen = new TimeOutScreenView();
      this._bindTimeOutScreen();
      showScreen(this._timeOutScreen);
    };
  }

  init() {
    this._greetingScreen = new GreetingScreenView();
    this._greetingScreen.onPlayButtonClick = () => {
      this._gameModel.resetState();
      this._showNextGameScreen();
    };
    showScreen(this._greetingScreen);
  }

  _showNextGameScreen() {
    if (!this._timerId) {
      this._startTimer();
    }

    if (this._gameModel.isGameContinued()) {
      const questionType = this._gameModel.questionType;
      const question = this._gameModel.question;
      this._questionScreen = new screenType[questionType](question);
      if (questionType === QuestionType.ARTIST) {
        this._bindArtistScreen();
      } else if (questionType === QuestionType.GENRE) {
        this._bindGenreScreen();
      }

      if (!this._timerGraphic) {
        this._timerGraphic = new TimerGraphicView();
      }
      if (!this._timerText) {
        this._timerText = new TimerTextView();
      }

      this._showTimer();
      this._addMistakes();

      showScreen(this._questionScreen);
      this._screenTime = this._gameModel.time;
      this._gameModel.upQuestion();
    } else {
      this._stopTimer();
      if (this._gameModel.isAttemptsOut()) {
        this._attemptsOutScreen = new AttemptsOutScreenView();
        this._bindAttemptsOutScreen();
        showScreen(this._attemptsOutScreen);
      } else if (this._gameModel.isUserWin()) {
        this._bindWinScreen();
        showScreen(this._winScreen);
      }
    }
  }

  _startTimer() {
    this._timerId = setInterval(() => {
      this._gameModel.tickTimer();
      this._gameModel.checkTimer();
    }, 1000);
  }

  _stopTimer() {
    clearInterval(this._timerId);
    this._timerId = null;
  }

  _bindArtistScreen() {
    this._questionScreen.onAnswersFormChange = (answer, screenQuestion) => {
      const roundTime = this._gameModel.calcRoundTime(this._screenTime);
      this._gameModel.checkAnswer(GameModel.checkArtistScreen(answer, screenQuestion), roundTime);
      this._showNextGameScreen();
    };
  }

  _bindGenreScreen() {
    this._questionScreen.onAnswer = (answers, screenQuestion) => {
      const roundTime = this._gameModel.calcRoundTime(this._screenTime);
      this._gameModel.checkAnswer(GameModel.checkGenreScreen(answers, screenQuestion), roundTime);
      this._showNextGameScreen();
    };
  }

  _showTimer() {
    this._questionScreen.append(this._timerGraphic);
    this._questionScreen.append(this._timerText);
  }

  _addMistakes() {
    const mistakesView = new MistakesView();
    const mistakes = this._gameModel.mistakes;
    mistakesView.showMistakes(mistakes);
    this._questionScreen.append(mistakesView);
  }

  _bindAttemptsOutScreen() {
    this._attemptsOutScreen.onReplayButtonClick = () => {
      this.init();
    };
  }

  _bindWinScreen() {
    const points = this._gameModel.calcPoints();
    const fastAnswers = this._gameModel.calcAnswersType(AnswerType.FAST);
    const winnerStatistics = GameModel.getWinnerStatistic(points, statistics);
    const mistakes = this._gameModel.mistakes;
    const gameTime = this._gameModel.gameTime;
    this._winScreen = new WinScreenView(mistakes, points, fastAnswers, winnerStatistics, gameTime);
    this._winScreen.onReplayButtonClick = () => {
      this.init();
    };
  }

  _bindTimeOutScreen() {
    this._timeOutScreen.onReplayButtonClick = () => {
      this.init();
    };
  }
}
