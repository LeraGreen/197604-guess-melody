import {getElementFromTemplate, showScreen, getRandomFromArray, showGameScreen, checkRightAnswer} from '../utils';
import getWinScreen from '../results/get-win-screen';
import getAttemptsOutScreen from '../results/get-attempts-out-screen';
import getTimeOutScreen from '../results/get-timeout-screen';
import header from '../header/header';
import {currentState, statistics, questions, checkAnswer} from '../data/game-data';

const getSecondScreen = (state, question) => {
  const template = `<section class="main main--level main--level-genre">
    ${header(state)}

    <div class="main-wrap">
      <h2 class="title">Выберите ${question.genre} треки</h2>
      <form class="genre">
      ${question.answers.reduce((acc, it, i) =>
    acc + `<div class="genre-answer">
      <div class="player-wrapper">
        <div class="player">
          <audio></audio>
          <button class="player-control player-control--pause"></button>
          <div class="player-track">
            <span class="player-status"></span>
          </div>
        </div>
      </div>
      <input type="checkbox" name="answer" value="${it.genre}" id="a-${i}">
      <label class="genre-answer-check" for="a-${i}"></label>
    </div>` + `\n`
      , ``)}


        <button class="genre-answer-send" type="submit">Ответить</button>
      </form>
    </div>
  </section>`;

  const resultScreens = [getWinScreen(currentState, statistics), getAttemptsOutScreen(), getTimeOutScreen()];
  const secondScreen = getElementFromTemplate(template);
  const answersForm = secondScreen.querySelector(`.genre`);
  answersForm.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    const answers = answersForm.elements.answer;
    const checkedAnswers = [];
    for (const answer of answers) {
      if (answer.checked) {
        checkedAnswers.push(answer.value);
      }
    }
    state.answers.push(checkAnswer(checkRightAnswer(checkedAnswers, question)));
    // showScreen(getRandomFromArray(resultScreens));
    showGameScreen(state, questions);
  });

  return secondScreen;
};

export default getSecondScreen;
