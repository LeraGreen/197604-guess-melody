import {getElementFromTemplate} from '../utils';

class TimeOutScreenView {
  constructor() {
    this.element = getElementFromTemplate(this.template);
    this.bind();
  }

  get template() {
    return `<section class="main main--result">
      <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

      <h2 class="title">Увы и ах!</h2>
      <div class="main-stat">Время вышло!<br>Вы не успели отгадать все мелодии</div>
      <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
    </section>`;
  }

  bind() {
    const buttonReplay = this.element.querySelector(`.main-replay`);
    buttonReplay.addEventListener(`click`, () => this.showGreetingScreen());
  }

  showGreetingScreen() {
  }
}

export default TimeOutScreenView;
