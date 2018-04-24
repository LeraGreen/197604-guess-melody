import {getElementFromTemplate} from '../utils';
import {calsPoints, splitTime, calcAnswersType, getWinnerStatistics} from '../data/game-data';
import pluralize from '../plural/plural';

class WinScreenView {
  constructor(state, statistics) {
    this.state = state;
    this.statistics = statistics;
    this.element = getElementFromTemplate(this.template);
    this.bind();
  }

  get template() {
    this.time = splitTime(this.state.time);
    const points = calsPoints(this.state.answers);
    const fastAnswers = calcAnswersType(this.state.answers, `fast`);
    const winnerStatistics = getWinnerStatistics(points, this.statistics);

    return `<section class="main main--result">
      <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

      <h2 class="title">Вы настоящий меломан!</h2>
      <div class="main-stat">За ${pluralize(this.time.minutes, [`минут`, `минуту`, `минуты`])} и ${pluralize(this.time.seconds, [`секунд`, `секунду`, `секунды`])}
        <br>вы&nbsp;набрали ${pluralize(points, [`баллов`, `балл`, `балла`])} (${pluralize(fastAnswers, [`быстрых`, `быстрый`, `быстрых`])})
        <br>${pluralize(this.state.mistakes, [`ошибок`, `ошибка`, `ошибки`])}</div>
      <span class="main-comparison">Вы заняли ${winnerStatistics.position} место из ${pluralize(winnerStatistics.players, [`игроков`, `игрока`, `игроков`])}. Это лучше, чем у ${pluralize(winnerStatistics.percent, [`игроков`, `игрока`, `игроков`], `%`)}!</span>
      <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
    </section>`;
  }

  bind() {
    const buttonReplay = this.element.querySelector(`.main-replay`);
    buttonReplay.addEventListener(`click`, () => this.showGreetingScreen());
  }

  showGreetingScreen() {
  }
}

export default WinScreenView;
