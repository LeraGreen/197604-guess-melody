import AbstractView from '../abstract-view';
import {splitTime} from '../data/game-data';
import {addLeadingZero} from '../utils';

class TimerTextView extends AbstractView {
  get template() {
    return `<div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
      <span class="timer-value-mins" id="minutes"></span><!--
      --><span class="timer-value-dots">:</span><!--
      --><span class="timer-value-secs" id="seconds"></span>
    </div>`;
  }

  showTime(rawTime) {
    const time = splitTime(rawTime);

    if (!this._minutesElement) {
      this._minutesElement = document.getElementById(`minutes`);
    }

    if (!this._secondsElement) {
      this._secondsElement = document.getElementById(`seconds`);
    }

    this._minutesElement.textContent = addLeadingZero(time.minutes);
    this._secondsElement.textContent = addLeadingZero(time.seconds);
  }
}

export default TimerTextView;
