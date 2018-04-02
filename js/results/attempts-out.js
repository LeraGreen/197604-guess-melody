import {getElementFromTemplate, showScreen} from '../utils';
import greetingScreen from '../greeting/greeting';

const template = `<section class="main main--result">
  <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
  <h2 class="title">Какая жалость!</h2>
  <div class="main-stat">У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!</div>
  <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
</section>
</template>`;
const attemptsOutScreen = getElementFromTemplate(template);
const buttonReplay = attemptsOutScreen.querySelector(`.main-replay`);
buttonReplay.addEventListener(`click`, () => showScreen(greetingScreen));

export default attemptsOutScreen;
