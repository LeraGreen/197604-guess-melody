import AbstractView from '../view';

class AuthorScreenView extends AbstractView {
  constructor(state, question) {
    super();
    this.state = state;
    this.question = question;
  }

  get template() {
    return `<section class="main main--level main--level-artist">

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
                   alt="${it.artist}" width="134" height="134">
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
      this.onAnswersFormChange(evt.target, this.question);
      this.stopPlayer(playerControl, audio);
    });

    playerControl.addEventListener(`click`, () => {
      this.onPlayerControlClick(playerControl, audio);
    });
  }

  onPlayerControlClick(button, audio) {
    if (audio.paused) {
      audio.play();
      button.classList.remove(`player-control--play`);
      button.classList.add(`player-control--pause`);
    } else {
      audio.pause();
      button.classList.remove(`player-control--pause`);
      button.classList.add(`player-control--play`);
    }
  }

  stopPlayer(button, audio) {
    if (!audio.paused) {
      audio.pause();
      button.classList.remove(`player-control--pause`);
      button.classList.add(`player-control--play`);
    }
  }

  onAnswersFormChange() {
  }

  append(view) {
    // TODO: Ленивые вычисления
    const nextElement = this.element.querySelector(`.main-wrap`);
    this.element.insertBefore(view.element, nextElement);
  }
}

export default AuthorScreenView;
