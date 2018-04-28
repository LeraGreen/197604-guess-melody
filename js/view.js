import {getElementFromTemplate} from './utils';

// TODO: Название класса не совпадает с названием файла
export default class AbstractView {

  get template() {
    throw new Error(`You don't have any template`);
  }

  bind() {
  }

  get element() {
    if (!this._element && this.template) {
      this._element = getElementFromTemplate(this.template);
      this.bind();
    }

    return this._element;
  }
}
