import AbstractView from '../../abstract-view';

class GenreScreenView extends AbstractView {
  constructor(question) {
    super();
    this._question = question;
    this._activePlayer = null;
    this._answersVariants = this._question.answers;
  }

  get template() {
    return `<section class="main main--level main--level-genre">
      <div class="main-wrap">
        <h2 class="title">${this._question.question}</h2>
        <form class="genre">
          ${this._answersVariants.reduce((acc, it, i) => acc +
          `<div class="genre-answer" ${this._showRightAnswer(it)}>
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
          </div>` + `\n`, ``)}
          <button class="genre-answer-send" type="submit">Ответить</button>
        </form>
      </div>
    </section>`;
  }

  _onPlayerControlClick(player, button, audio) {
    if (!audio.paused) {
      if (this._activePlayer) {
        this._activePlayer = null;
      }
      audio.pause();
      button.classList.add(`player-control--play`);
      button.classList.remove(`player-control--pause`);
    } else {
      if (this._activePlayer) {
        const activeSong = this._activePlayer.querySelector(`audio`);
        const activeButton = this._activePlayer.querySelector(`button`);
        activeSong.pause();
        activeButton.classList.add(`player-control--play`);
        activeButton.classList.remove(`player-control--pause`);
      }
      this._activePlayer = player;
      audio.play().catch(() => {});
      button.classList.remove(`player-control--play`);
      button.classList.add(`player-control--pause`);
    }
  }

  _stopPlayer() {
    if (this._activePlayer) {
      const activeSong = this._activePlayer.querySelector(`audio`);
      const activeButton = this._activePlayer.querySelector(`button`);
      activeSong.pause();
      activeButton.classList.add(`player-control--play`);
      activeButton.classList.remove(`player-control--pause`);
    }
  }

  // Подсветка правильного ответа для удобства проверки
  _showRightAnswer(answer) {
    return answer.genre === this._question.genre ? `style="outline: rgba(225, 151, 23, .5) solid 3px"` : ``;
  }
  bind() {
    const answersForm = this.element.querySelector(`.genre`);
    const players = this.element.querySelectorAll(`.player`);

    answersForm.addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      const answers = answersForm.elements.answer;
      const checkedAnswerOptions = [];
      for (const it of answers) {
        if (it.checked) {
          checkedAnswerOptions.push(it.value);
        }
      }
      this.onAnswer(checkedAnswerOptions, this._question, this._answersVariants);
      this._stopPlayer();
    });

    for (const player of players) {
      const button = player.querySelector(`button`);
      const audio = player.querySelector(`audio`);
      button.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        this._onPlayerControlClick(player, button, audio);
      });
    }
  }

  append(view) {
    if (!this._nextElement) {
      this._nextElement = this.element.querySelector(`.main-wrap`);
    }
    this.element.insertBefore(view.element, this._nextElement);
  }

  onAnswer() {
  }
}

export default GenreScreenView;
