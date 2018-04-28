import {getElementFromTemplate} from '../utils';

class TimerTimeView {
  constructor() {
    this.element = getElementFromTemplate(this.template);
  }

  get template() {
    return `<div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
      <span class="timer-value-mins" id="minutes"></span><!--
      --><span class="timer-value-dots">:</span><!--
      --><span class="timer-value-secs" id="seconds"></span>
    </div>`;
  }
}

export default TimerTimeView;
