import {getElementFromTemplate} from '../utils';

class AttemptsOutScreenView {
  constructor() {
    this.element = getElementFromTemplate(this.template);
    this.bind();
  }

  get template() {
    return `<section class="main main--result">
      <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
      <h2 class="title">Какая жалость!</h2>
      <div class="main-stat">У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!</div>
      <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
    </section>
    </template>`;
  }

  bind() {
    const buttonReplay = this.element.querySelector(`.main-replay`);
    buttonReplay.addEventListener(`click`, () => this.onReplayButtonClick());
  }

  onReplayButtonClick() {
  }
}

export default AttemptsOutScreenView;
