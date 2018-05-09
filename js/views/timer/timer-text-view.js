import AbstractView from '../abstract-view';
import {splitTime} from '../../utils';

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

    this._minutesElement.textContent = TimerTextView.addLeadingZero(time.minutes);
    this._secondsElement.textContent = TimerTextView.addLeadingZero(time.seconds);
  }

  setAlarm(isAlarm) {
    this.element.classList.toggle(`timer-value--finished`, isAlarm);
  }

  static addLeadingZero(number) {
    return `${number >= 10 ? `` : `0`}${number}`;
  }
}

export default TimerTextView;
