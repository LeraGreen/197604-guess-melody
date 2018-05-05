import AbstractView from '../../abstract-view';

class ArtistScreenView extends AbstractView {
  constructor(question) {
    super();
    this._question = question;
    this._answersVariants = this._question.answers;
  }

  // Подсветка правильного ответа для удобства проверки
  static _showRightAnswer(answer) {
    return answer.isCorrect ?
      `style="outline: rgba(225, 151, 23, .5) solid 3px"` :
      ``;
  }

  get template() {
    return `<section class="main main--level main--level-artist">
      <div class="main-wrap">
        <h2 class="title main-title">${this._question.question}</h2>
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
          ${this._answersVariants.reduce((acc, it, i) => acc +
            `<div class="main-answer-wrapper" ${ArtistScreenView._showRightAnswer(it)}>
              <input class="main-answer-r" type="radio" id="answer-${i}" name="answer" value="${it.title}"/>
              <label class="main-answer" for="answer-${i}">
                <img class="main-answer-preview" src="${it.image.url}"
                   alt="${it.title}" width="134" height="134">
                ${it.title}
              </label>
            </div>` + `\n`, ``)}
        </form>
    </section>`;
  }

  _onPlayerControlClick() {
    if (this._audio.paused) {
      this._audio.play().catch(() => {});
      this._playerControl.classList.remove(`player-control--play`);
      this._playerControl.classList.add(`player-control--pause`);
    } else {
      this._audio.pause();
      this._playerControl.classList.remove(`player-control--pause`);
      this._playerControl.classList.add(`player-control--play`);
    }
  }

  _stopPlayer() {
    if (!this._audio.paused) {
      this._audio.pause();
      this._playerControl.classList.remove(`player-control--pause`);
      this._playerControl.classList.add(`player-control--play`);
    }
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
      if (evt.target.name === `answer`) {
        this.onAnswersFormChange(evt.target.value, this._answersVariants);
        this._stopPlayer();
      }
    });

    this._playerControl.addEventListener(`click`, () => {
      this._onPlayerControlClick();
    });
  }

  append(view) {
    if (!this._nextElement) {
      this._nextElement = this.element.querySelector(`.main-wrap`);
    }
    this.element.insertBefore(view.element, this._nextElement);
  }

  onAnswersFormChange() {
  }
}

export default ArtistScreenView;
