import AbstractView from '../abstract-view';

class AuthorScreenView extends AbstractView {
  constructor(question) {
    super();
    this._question = question;
  }

  get template() {
    return `<section class="main main--level main--level-artist">
      <div class="main-wrap">
        <h2 class="title main-title">Кто исполняет эту песню?</h2>
        <div class="player-wrapper">
          <div class="player">
            <audio src="${this._question.src}" autoplay preload="auto"></audio>
            <button class="player-control player-control--pause"></button>
            <div class="player-track">
              <span class="player-status"></span>
            </div>
          </div>
        </div>
        <form class="main-list">
          ${this._question.answers.reduce((acc, it, i) => acc +
            `<div class="main-answer-wrapper">
              <input class="main-answer-r" type="radio" id="answer-${i}" name="answer" value="${it.artist}"/>
              <label class="main-answer" for="answer-${i}">
                <img class="main-answer-preview" src="${it.imageUrl}"
                   alt="${it.artist}" width="134" height="134">
                ${it.artist}
              </label>
            </div>` + `\n`, ``)}
        </form>
    </section>`;
  }

  bind() {
    const answersForm = this.element.querySelector(`.main-list`);
    if (!this._playerControl) {
      this._playerControl = this.element.querySelector(`.player-control`);
    }
    if (!this._audio) {
      this._audio = this.element.querySelector(`audio`);
    }

    answersForm.addEventListener(`change`, (evt) => {
      this.onAnswersFormChange(evt.target, this._question);
      this.stopPlayer();
    });

    this._playerControl.addEventListener(`click`, () => {
      this.onPlayerControlClick();
    });
  }

  onPlayerControlClick() {
    if (this._audio.paused) {
      this._audio.play();
      this._playerControl.classList.remove(`player-control--play`);
      this._playerControl.classList.add(`player-control--pause`);
    } else {
      this._audio.pause();
      this._playerControl.classList.remove(`player-control--pause`);
      this._playerControl.classList.add(`player-control--play`);
    }
  }

  stopPlayer() {
    if (!this._audio.paused) {
      this._audio.pause();
      this._playerControl.classList.remove(`player-control--pause`);
      this._playerControl.classList.add(`player-control--play`);
    }
  }

  onAnswersFormChange() {
  }

  append(view) {
    if (!this._nextElement) {
      this._nextElement = this.element.querySelector(`.main-wrap`);
    }
    this.element.insertBefore(view.element, this._nextElement);
  }
}

export default AuthorScreenView;
