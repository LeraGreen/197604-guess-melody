import {getElementFromTemplate, showScreen} from '../utils';
import getGreetingScreen from '../greeting/get-greeting-screen';
import {calsPoints, splitTime, calcAnswersType, getWinnerStatistics} from '../data/game-data';
import pluralize from '../data/plural';

const getWinScreen = (state, statistics) => {
  const time = splitTime(state.time);
  const points = calsPoints(state.answers);
  const fastAnswers = calcAnswersType(state.answers, `fast`);
  const winnerStatistics = getWinnerStatistics(points, statistics);
  const template = `<section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

    <h2 class="title">Вы настоящий меломан!</h2>
    <div class="main-stat">За ${pluralize(time.minutes, [`минут`, `минута`, `минуты`])} и ${pluralize(time.seconds, [`секунд`, `секунда`, `секунды`])}
      <br>вы&nbsp;набрали ${pluralize(points, [`баллов`, `балл`, `балла`])} (${pluralize(fastAnswers, [`быстрых`, `быстрый`, `быстрых`])})
      <br>${pluralize(state.mistakes, [`ошибок`, `ошибка`, `ошибки`])}</div>
    <span class="main-comparison">Вы заняли ${winnerStatistics.position} место из ${pluralize(winnerStatistics.players, [`игроков`, `игрока`, `игроков`])}. Это лучше, чем у ${pluralize(winnerStatistics.percent, [`игроков`, `игрока`, `игроков`], `%`)}!</span>
    <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
  </section>`;

  const winScreen = getElementFromTemplate(template);
  const buttonReplay = winScreen.querySelector(`.main-replay`);
  buttonReplay.addEventListener(`click`, () => showScreen(getGreetingScreen()));

  return winScreen;
};

export default getWinScreen;
