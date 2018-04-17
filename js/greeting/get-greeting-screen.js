import {getElementFromTemplate} from '../utils';
// import getFirstScreen from '../first-screen/get-first-screen';
import {initialState, currentState, questions} from '../data/game-data';
import {showGameScreen} from '../change-screen/change-screen';

const getGreetingScreen = () => {
  const template = `<section class="main main--welcome">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <button class="main-play">Начать игру</button>
    <h2 class="title main-title">Правила игры</h2>
    <p class="text main-text">
      Правила просты&nbsp;— за&nbsp;5 минут ответить на все вопросы.<br>
      Ошибиться можно 3 раза.<br>
      Удачи!
    </p>
  </section>`;

  const greetingScreen = getElementFromTemplate(template);
  const playButton = greetingScreen.querySelector(`.main-play`);
  playButton.addEventListener(`click`, () => {
    Object.assign(currentState, initialState);
    showGameScreen(currentState, questions);
    // showScreen(getFirstScreen(currentState, questions[0]));
  });
  return greetingScreen;
};

export default getGreetingScreen;
