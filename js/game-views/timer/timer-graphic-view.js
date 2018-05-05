import AbstractView from '../../abstract-view';

class TimerGraphicView extends AbstractView {
  constructor() {
    super();
    this._radius = 370;
    this._circumference = Math.round(2 * Math.PI * this._radius);
  }
  get template() {
    return `<svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780" stroke-dasharray="${this._circumference}">
    <circle
      cx="390" cy="390" r="${this._radius}"
      class="timer-line"
      style="filter: url(#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>
  </svg>`;
  }

  showTime(coefficient) {
    const offset = (this._circumference - this._circumference * coefficient).toFixed(1);
    this.element.setAttribute(`stroke-dashoffset`, offset);
  }

}

export default TimerGraphicView;
