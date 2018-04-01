import template from './first-screen-view';
import {getElementFromTemplate, showScreen} from '../utils';
import secondScreenContent from '../second-screen/second-screen';

const buttonNextClass = `main-answer`;
const firstScreenContent = getElementFromTemplate(template);
const answersForm = firstScreenContent.querySelector(`.main-list`);
answersForm.addEventListener(`click`, (event) => {
  if (event.target.classList.contains(buttonNextClass)) {
    showScreen(secondScreenContent);
  }
})
export default firstScreenContent;
