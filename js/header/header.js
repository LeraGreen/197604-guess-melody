import timer from '../timer/timer';

export default (state) => {

  return `${timer()}
  <div class="main-mistakes">
    ${new Array(state.mistakes)
      .fill(`<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`)
      .join(``)}
  </div>`;
};
