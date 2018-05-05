import AbstractView from '../../abstract-view';

class TimerGraphicView extends AbstractView {
  constructor(time) {
    super();
    this._radius = 370;
    this._circumference = Math.round(2 * Math.PI * this._radius);
    this._offset = 0;
    this._number = 2325 / time;
  }
  get template() {
    return `<svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780" stroke-dasharray="${this._circumference}">
    <circle
      cx="390" cy="390" r="${this._radius}"
      class="timer-line"
      style="filter: url(#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>
  </svg>`;
  }

  showTime() {
    this._offset += this._number;
    this.element.setAttribute(`stroke-dashoffset`, this._offset);
  }

}

export default TimerGraphicView;
