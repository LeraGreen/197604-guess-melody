import {getElementFromTemplate} from '../utils';
import header from '../header/header';
import {questions} from '../data/game-data';
import {showGameScreen, checkArtistScreen} from '../change-screen/change-screen';

class FirstScreenView {
  constructor(state, question) {
    this.state = state;
    this.question = question;
    this.element = getElementFromTemplate(this.template);
    this.bind();
  }

  get template() {
    return `<section class="main main--level main--level-artist">
      ${header(this.state)}

      <div class="main-wrap">
        <h2 class="title main-title">Кто исполняет эту песню?</h2>
        <div class="player-wrapper">
          <div class="player">
            <audio src="${this.question.src}" autoplay preload="auto"></audio>
            <button class="player-control player-control--pause"></button>
            <div class="player-track">
              <span class="player-status"></span>
            </div>
          </div>
        </div>
        <form class="main-list">
     ${this.question.answers.reduce((acc, it, i) =>
    acc + `<div class="main-answer-wrapper">
            <input class="main-answer-r" type="radio" id="answer-${i}" name="answer" value="${it.artist}"/>
            <label class="main-answer" for="answer-${i}">
              <img class="main-answer-preview" src="${it.imageUrl}"
                   alt="Пелагея" width="134" height="134">
              ${it.artist}
            </label>
          </div>` + `\n`
      , ``)}
    </section>`;
  }

  bind() {
    const answersForm = this.element.querySelector(`.main-list`);
    const playerControl = this.element.querySelector(`.player-control`);
    const audio = this.element.querySelector(`audio`);
    answersForm.addEventListener(`change`, (evt) => {
      if (evt.target.name === `answer`) {
        showGameScreen(this.state, questions, checkArtistScreen(evt.target.value, this.question));
      }
    });
    playerControl.addEventListener(`click`, (evt) => {
      if (evt.target.classList.contains(`player-control--pause`)) {
        audio.pause();
      } else if (evt.target.classList.contains(`player-control--play`)) {
        audio.play();
      }
      evt.target.classList.toggle(`player-control--pause`);
      evt.target.classList.toggle(`player-control--play`);
    });
  }

  showNextScreen() {
  }
}

export default FirstScreenView;
