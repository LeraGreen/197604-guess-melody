import AbstractView from '../../abstract-view';

class MistakesView extends AbstractView {
  constructor(mistakes) {
    super();
    this._mistakes = mistakes;
  }
  get template() {
    return `<div class="main-mistakes">
      ${new Array(this._mistakes)
      .fill(`<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`)
      .join(``)}</div>`;
  }
}

export default MistakesView;
