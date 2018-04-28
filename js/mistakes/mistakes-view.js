import {getElementFromTemplate} from '../utils';
import AbstractView from '../view';

class MistakesView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    return `<div class="main-mistakes"></div>`;
  }

  // TODO давай переименуем render во что-нибудь другое, например show
  renderMistakes(mistakes) {
    const mistakesArr = new Array(mistakes)
        .fill(`<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`);
    const fragment = document.createDocumentFragment();
    for (const mistake of mistakesArr) {
      const template = getElementFromTemplate(mistake);
      fragment.appendChild(template);
    }
    this.element.appendChild(fragment);
  }
}

export default MistakesView;
