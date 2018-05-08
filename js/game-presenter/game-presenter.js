import ArtistScreenView from '../game-views/artist-screen/artist-screen-view';
import GenreScreenView from '../game-views/genre-screen/genre-screen-view';
import {AnswerType} from '../data/game-data';
import {showScreen} from '../utils';
import WinScreenView from '../game-views/results/win-screen-view';
import AttemptsOutScreenView from '../game-views/results/attempts-out-screen-view';
import TimeOutScreenView from '../game-views/results/timeout-screen-view';
import GreetingScreenView from '../game-views/greeting/greeting-screen-view';
import MistakesView from '../game-views/mistakes/mistakes-view';
import TimerGraphicView from '../game-views/timer/timer-graphic-view';
import TimerTextView from '../game-views/timer/timer-text-view';
import GameModel from '../game-model/game-model';
import Loader from "../loader";
import startGame from "../main";

const TIMER_INTERVAL = 1000;

const QuestionType = {
  ARTIST: `artist`,
  GENRE: `genre`
};

const QuestionTypeToView = {
  [QuestionType.ARTIST]: ArtistScreenView,
  [QuestionType.GENRE]: GenreScreenView
};

const ResultType = {
  TIME_OUT: `timeEnd`,
  WIN: `win`,
  ATTEMPTS_OUT: `attemptsOut`
};

const TimerResult = {
  TIME_OUT: `timeEnd`,
  ALARM: `alarm`,
  TICK: `tick`
};

class GamePresenter {
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
    this._gameModel = null;
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

    this._gameModel.upQuestion();

    if (this._gameModel.isGameContinued()) {
      this._continueGame();
    } else {
      this._showResultScreen(this._gameModel.getGameResult());
    }
  }

  _startTimer() {
    this._timerId = setInterval(() => {
      switch (this._gameModel.checkTimer()) {
        case TimerResult.TIME_OUT:
          this._showResultScreen(ResultType.TIME_OUT);
          break;
        case TimerResult.ALARM:
          this._timerText.setAlarm(true);
          this.tickTimer();
          break;
        case TimerResult.TICK:
          this.tickTimer();
          break;
      }
    }, TIMER_INTERVAL);
  }

  _stopTimer() {
    clearInterval(this._timerId);
    this._timerId = null;
  }

  _bindArtistScreen() {
    this._questionScreen.onAnswersFormChange = (answer, answersVariants) => {
      const roundTime = this._gameModel.calcRoundTime(this._screenTime);
      this._gameModel.checkAnswer(GameModel.isArtistAnswerCorrect(answer, answersVariants), roundTime);
      this._showNextGameScreen();
    };
  }

  _bindGenreScreen() {
    this._questionScreen.onAnswer = (answers, screenQuestion, answerVariants) => {
      const roundTime = this._gameModel.calcRoundTime(this._screenTime);
      this._gameModel.checkAnswer(GameModel.isGenreAnswerCorrect(answers, screenQuestion, answerVariants), roundTime);
      this._showNextGameScreen();
    };
  }

  _showTimer() {
    this._questionScreen.append(this._timerGraphic);
    this._questionScreen.append(this._timerText);
  }

  _addMistakes() {
    const mistakesView = new MistakesView(this._gameModel.mistakes)
    this._questionScreen.append(mistakesView);
  }

  _bindAttemptsOutScreen() {
    this._attemptsOutScreen.onReplayButtonClick = () => {
      startGame();
    };
  }

  _bindWinScreen() {
    this._winScreen.onReplayButtonClick = () => {
      startGame();
    };
  }

  _bindTimeOutScreen() {
    this._timeOutScreen.onReplayButtonClick = () => {
      startGame();
    };
  }

  startGame(data) {
    this._gameModel = new GameModel(data);
    this._greetingScreen.enableStartGameButton();
  }

  _continueGame() {
    const questionType = this._gameModel.questionType;
    const question = this._gameModel.question;
    this._questionScreen = new QuestionTypeToView[questionType](question);

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
  }

  _showResultScreen(result) {
    this._stopTimer();
    switch (result) {
      case ResultType.TIME_OUT:
        this._timeOutScreen = new TimeOutScreenView();
        this._bindTimeOutScreen();
        showScreen(this._timeOutScreen);
        break;
      case ResultType.ATTEMPTS_OUT:
        this._attemptsOutScreen = new AttemptsOutScreenView();
        this._bindAttemptsOutScreen();
        showScreen(this._attemptsOutScreen);
        break;
      case ResultType.WIN:
        Loader.loadStatistics().then((data) => {
          this._onStatisticsLoad(data);
        }).catch(() => {
          this._onStatisticsLoad();
        });
    }
  }

  _onStatisticsLoad(data = null) {
    const points = this._gameModel.calcPoints();
    Loader.sendStatistics(points);

    const fastAnswers = this._gameModel.calcAnswersType(AnswerType.FAST);
    const mistakes = this._gameModel.mistakes;
    const gameTime = this._gameModel.gameTime - this._gameModel.time;
    const winnerStatistics = data ?
      GameModel.getWinnerStatistic(points, data) :
      null;

    this._winScreen = new WinScreenView(points, fastAnswers, mistakes, gameTime, winnerStatistics);
    this._bindWinScreen();
    showScreen(this._winScreen);
  }

  tickTimer() {
    this._timerText.showTime(this._gameModel.time);
    this._timerGraphic.showTime(this._gameModel.time, this._gameModel.gameTime);
    this._gameModel.tickTimer();
  }
}

export default GamePresenter;
