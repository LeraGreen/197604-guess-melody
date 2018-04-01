import template from './result-attempts-out-view';
import {getElementFromTemplate, showScreen} from '../utils';
import greetingScreenContent from '../greeting/greeting'

const resultAttemptsOutContent = getElementFromTemplate(template);
const buttonReplay = resultAttemptsOutContent.querySelector(`.main-replay`);
buttonReplay.addEventListener(`click`, () => showScreen(greetingScreenContent));

export default resultAttemptsOutContent;
