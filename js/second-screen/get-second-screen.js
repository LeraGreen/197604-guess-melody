import {getElementFromTemplate} from '../utils';
import header from '../header/header';
import {questions, checkAnswer} from '../data/game-data';
import {showGameScreen, checkGenreScreen} from '../change-screen/change-screen';

// TODO Обработать как ошибку экран без ответа на вопрос

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
          <audio src="${it.src}" preload="auto" id="audio-${i}"></audio>
          <button class="player-control player-control--play" data-audio="audio-${i}"></button>
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

  const secondScreen = getElementFromTemplate(template);
  const answersForm = secondScreen.querySelector(`.genre`);
  const playerControlls = secondScreen.querySelectorAll(`.player-control`);
  answersForm.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    const answers = answersForm.elements.answer;
    const checkedAnswers = [];
    for (const answer of answers) {
      if (answer.checked) {
        checkedAnswers.push(answer.value);
      }
    }
    state.answers.push(checkAnswer(checkGenreScreen(checkedAnswers, question)));
    showGameScreen(state, questions);
  });
  for (const playerControl of playerControlls) {
    playerControl.addEventListener(`click`, (evt) => {
      // неведомый превентдефоулт
      evt.preventDefault();
      const audio = secondScreen.querySelector(`#${evt.target.dataset.audio}`);

      if (evt.target.classList.contains(`player-control--pause`)) {
        audio.pause();
      } else if (evt.target.classList.contains(`player-control--play`)) {
        audio.play();
      }
      evt.target.classList.toggle(`player-control--pause`);
      evt.target.classList.toggle(`player-control--play`);
    });
  }

  return secondScreen;
};

export default getSecondScreen;
