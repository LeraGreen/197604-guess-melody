import {getElementFromTemplate} from '../utils';


class HeaderView {
  constructor(state) {
    this.state = state;
    this.element = getElementFromTemplate(this.template);
  }

  get template() {
    return `<header></header>`;
  }

  renderMistakes(mistakes) {
    const mistakesString = `<div class="main-mistakes">
     ${new Array(mistakes)
      .fill(`<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`)
      .join(``)}
      </div>`;
    this.element.appendChild(getElementFromTemplate(mistakesString));
  }

  append(view) {
    const nextElement = this.element.querySelector(`.main-mistakes`);
    this.element.insertBefore(view.element, nextElement);
  }
}

export default HeaderView;
