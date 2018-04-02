import {getElementFromTemplate, showScreen} from '../utils';
import greetingScreenContent from '../greeting/greeting';

const template = `<section class="main main--result">
  <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

  <h2 class="title">Увы и ах!</h2>
  <div class="main-stat">Время вышло!<br>Вы не успели отгадать все мелодии</div>
  <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
</section>`;

const resultTimeOutContent = getElementFromTemplate(template);
const buttonReplay = resultTimeOutContent.querySelector(`.main-replay`);
buttonReplay.addEventListener(`click`, () => showScreen(greetingScreenContent));

export default resultTimeOutContent;
