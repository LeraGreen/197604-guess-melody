import AbstractView from '../../abstract-view';
import {splitTime} from '../../utils';
import pluralize from '../../plural/plural';

class WinScreenView extends AbstractView {
  constructor(mistakes, points, fastAnswers, winnerStatistics, gameTime) {
    super();
    this._mistakes = mistakes;
    this._points = points;
    this._fastAnswers = fastAnswers;
    this._winnerStatistics = winnerStatistics;
    this._gameTime = gameTime;
  }

  get template() {
    const time = splitTime(this._gameTime);

    return `<section class="main main--result">
      <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
      <h2 class="title">Вы настоящий меломан!</h2>
      <div class="main-stat">За ${pluralize(time.minutes, [`минут`, `минуту`, `минуты`])} и ${pluralize(time.seconds, [`секунд`, `секунду`, `секунды`])}
        <br>вы&nbsp;набрали ${pluralize(this._points, [`баллов`, `балл`, `балла`])} (${pluralize(this._fastAnswers, [`быстрых`, `быстрый`, `быстрых`])})
        <br>${pluralize(this._mistakes, [`ошибок`, `ошибка`, `ошибки`])}</div>
      <span class="main-comparison">Вы заняли ${this._winnerStatistics.position} место из ${pluralize(this._winnerStatistics.players, [`игроков`, `игрока`, `игроков`])}. Это лучше, чем у ${pluralize(this._winnerStatistics.percent, [`игроков`, `игрока`, `игроков`], `%`)}!</span>
      <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
    </section>`;
  }

  bind() {
    const replayButton = this.element.querySelector(`.main-replay`);
    replayButton.addEventListener(`click`, () => this.onReplayButtonClick());
  }

  onReplayButtonClick() {
  }
}

export default WinScreenView;
