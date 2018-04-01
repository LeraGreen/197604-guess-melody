import template from './result-view';
import {getElementFromTemplate, showScreen} from '../utils';
import greetingScreenContent from '../greeting/greeting';

const resultContent = getElementFromTemplate(template);
const buttonReplay = resultContent.querySelector(`.main-replay`);
buttonReplay.addEventListener(`click`, () => showScreen(greetingScreenContent));

export default resultContent;
