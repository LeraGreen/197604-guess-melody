import AbstractView from '../view';
import {splitTime} from '../data/game-data';

// TODO: TimerTextView
class TimerTimeView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `<div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
      <span class="timer-value-mins" id="minutes"></span><!--
      --><span class="timer-value-dots">:</span><!--
      --><span class="timer-value-secs" id="seconds"></span>
    </div>`;
  }

  // TODO плохое название метода, я бы назвал его showTime
  renderTimer(rawTime) {
    const time = splitTime(rawTime);

    if (!this._minutesElement) {
      this._minutesElement = document.getElementById(`minutes`);
    }

    if (!this._secondsElement) {
      this._secondsElement = document.getElementById(`seconds`);
    }

    this._minutesElement.textContent = time.minutes >= 10 ? time.minutes : `0` + time.minutes;
    this._secondsElement.textContent = time.seconds >= 10 ? time.seconds : `0` + time.seconds;
  }
}

export default TimerTimeView;
