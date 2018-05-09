import ArtistScreenView from '../game-views/artist-screen/artist-screen-view';
import GenreScreenView from '../game-views/genre-screen/genre-screen-view';
import {showScreen} from '../utils';
import MistakesView from '../game-views/mistakes/mistakes-view';
import TimerGraphicView from '../game-views/timer/timer-graphic-view';
import TimerTextView from '../game-views/timer/timer-text-view';
import GameModel from '../game-model/game-model';
import application, {ResultType} from '../application';

const TIMER_INTERVAL = 1000;

const QuestionType = {
  ARTIST: `artist`,
  GENRE: `genre`
};

const QuestionTypeToView = {
  [QuestionType.ARTIST]: ArtistScreenView,
  [QuestionType.GENRE]: GenreScreenView
};

const TimerResult = {
  TIME_OUT: `timeEnd`,
  ALARM: `alarm`,
  TICK: `tick`
};

class GamePresenter {
  constructor(model) {
    this._questionScreen = null;
    this._timerId = null;
    this._timerGraphic = null;
    this._timerText = null;
    this._screenTime = null;

    this._gameModel = model;
    this._gameModel.resetState();
  }

  _showNextGameScreen() {
    this._gameModel.upQuestion();
    if (this._gameModel.isGameContinued()) {
      this._continueGame();
    } else {
      this._endGame(this._gameModel.getGameResult());
    }
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

  _endGame(resultType) {
    this._stopTimer();
    application.endGame(resultType);
  }

  _startTimer() {
    this._timerId = setInterval(() => {
      switch (this._gameModel.checkTimer()) {
        case TimerResult.TIME_OUT:
          this._endGame(ResultType.TIME_OUT);
          break;
        case TimerResult.ALARM:
          this._timerText.setAlarm(true);
          this._tickTimer();
          break;
        case TimerResult.TICK:
          this._tickTimer();
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

  _tickTimer() {
    this._timerText.showTime(this._gameModel.time);
    this._timerGraphic.showTime(this._gameModel.time, this._gameModel.gameTime);
    this._gameModel.tickTimer();
  }

  _showTimer() {
    this._questionScreen.append(this._timerGraphic);
    this._questionScreen.append(this._timerText);
  }

  _addMistakes() {
    const mistakesView = new MistakesView(this._gameModel.mistakes)
    this._questionScreen.append(mistakesView);
  }

  startGame() {
    if (!this._timerId) {
      this._startTimer();
    }

    this._showNextGameScreen();
  }
}

export default GamePresenter;
