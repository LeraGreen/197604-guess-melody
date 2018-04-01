import template from './greeting-view';
import {getElementFromTemplate, showScreen} from '../utils';
import firstScreenContent from '../first-screen/first-screen';

const greetingScreenContent = getElementFromTemplate(template);
const playButton = greetingScreenContent.querySelector(`.main-play`);
playButton.addEventListener(`click`, () => showScreen(firstScreenContent));

export default greetingScreenContent;
