import {getElementFromTemplate} from '../utils';
import header from '../header/header';
import {questions} from '../data/game-data';
import {showGameScreen, checkGenreScreen} from '../change-screen/change-screen';

class SecondScreenView {
  constructor(state, question) {
    this.state = state;
    this.question = question;
    this.element = getElementFromTemplate(this.template);
    this.bind();
  }

  get template() {
    return `<section class="main main--level main--level-genre">
      ${header(this.state)}

      <div class="main-wrap">
        <h2 class="title">Выберите ${this.question.genre} треки</h2>
        <form class="genre">
        ${this.question.answers.reduce((acc, it, i) =>
    acc + `<div class="genre-answer">
        <div class="player-wrapper">
          <div class="player">
            <audio src="${it.src}" preload="auto"></audio>
            <button class="player-control player-control--play"></button>
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
  }

  bind() {
    const answersForm = this.element.querySelector(`.genre`);
    const players = this.element.querySelectorAll(`.player`);
    let activePlayer = null;
    answersForm.addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      const answers = answersForm.elements.answer;
      const checkedAnswers = [];
      for (const answer of answers) {
        if (answer.checked) {
          checkedAnswers.push(answer.value);
        }
      }
      showGameScreen(this.state, questions, checkGenreScreen(checkedAnswers, this.question));
    });

    for (const player of players) {
      const button = player.querySelector(`button`);
      const audio = player.querySelector(`audio`);
      button.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        if (evt.target.classList.contains(`player-control--pause`)) {
          audio.pause();
          if (activePlayer) {
            activePlayer = null;
          }
        } else if (evt.target.classList.contains(`player-control--play`)) {
          if (activePlayer) {
            const activeSong = activePlayer.querySelector(`audio`);
            const activeButton = activePlayer.querySelector(`button`);
            activeSong.pause();
            activeButton.classList.toggle(`player-control--pause`);
            activeButton.classList.toggle(`player-control--play`);
          }
          activePlayer = player;
          audio.play();
        }
        evt.target.classList.toggle(`player-control--pause`);
        evt.target.classList.toggle(`player-control--play`);
      });
    }
  }
}

export default SecondScreenView;
