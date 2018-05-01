import {getElementFromTemplate} from '../utils';
import AbstractView from '../abstract-view';

class MistakesView extends AbstractView {
  get template() {
    return `<div class="main-mistakes"></div>`;
  }

  showMistakes(mistakes) {
    const mistakesArr = new Array(mistakes)
        .fill(`<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`)
        .reduce((prev, current) => {
          const template = getElementFromTemplate(current);
          prev.appendChild(template);
          return prev;
        }, document.createDocumentFragment());
    this.element.appendChild(mistakesArr);
  }
}

export default MistakesView;
