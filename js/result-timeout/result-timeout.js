import template from './result-timeout-view';
import {getElementFromTemplate, showScreen} from '../utils';
import greetingScreenContent from '../greeting/greeting';

const resultTimeOutContent = getElementFromTemplate(template);
const buttonReplay = resultTimeOutContent.querySelector(`.main-replay`);
buttonReplay.addEventListener(`click`, () => showScreen(greetingScreenContent));

export default resultTimeOutContent;
