import {getElementFromTemplate} from '../utils';

class GenreScreenView {
  constructor(state, question) {
    this.state = state;
    this.question = question;
    this.element = getElementFromTemplate(this.template);
    this.activePlayer = null;
    this.bind();
  }

  get template() {
    return `<section class="main main--level main--level-genre">

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
    answersForm.addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      this.onConfirmAnswers(answersForm, this.question);
      this.stopPlayer();
    });

    for (const player of players) {
      const button = player.querySelector(`button`);
      const audio = player.querySelector(`audio`);
      button.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        this.onPlayerControlClick(player, button, audio);
      });
    }
  }

  onConfirmAnswers() {
  }

  onPlayerControlClick(player, button, audio) {
    if (!audio.paused) {
      if (this.activePlayer) {
        this.activePlayer = null;
      }
      audio.pause();
      button.classList.add(`player-control--play`);
      button.classList.remove(`player-control--pause`);
    } else {
      if (this.activePlayer) {
        const activeSong = this.activePlayer.querySelector(`audio`);
        const activeButton = this.activePlayer.querySelector(`button`);
        activeSong.pause();
        activeButton.classList.add(`player-control--play`);
        activeButton.classList.remove(`player-control--pause`);
      }
      this.activePlayer = player;
      audio.play();
      button.classList.remove(`player-control--play`);
      button.classList.add(`player-control--pause`);
    }
  }

  stopPlayer() {
    if (this.activePlayer) {
      const activeSong = this.activePlayer.querySelector(`audio`);
      const activeButton = this.activePlayer.querySelector(`button`);
      activeSong.pause();
      activeButton.classList.add(`player-control--play`);
      activeButton.classList.remove(`player-control--pause`);
    }
  }

  append(view) {
    const nextElement = this.element.querySelector(`.main-wrap`);
    this.element.insertBefore(view.element, nextElement);
  }
}

export default GenreScreenView;
