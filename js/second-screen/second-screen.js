import template from './second-screen-view';
import {getElementFromTemplate, showScreen} from '../utils';
import resultContent from '../result/result';
import resultAttemptsOutContent from '../result-attempts-out/result-attempts-out';
import resultTimeOutContent from '../result-timeout/result-timeout';

const resultScreens = [resultContent, resultAttemptsOutContent, resultTimeOutContent];
const getRandomScreen = (array) => array[Math.floor(Math.random() * array.length)];

const secondScreenContent = getElementFromTemplate(template);
const answersForm = secondScreenContent.querySelector(`.genre`);
answersForm.addEventListener(`submit`, () => {
  showScreen(getRandomScreen(resultScreens));
});

export default secondScreenContent;
