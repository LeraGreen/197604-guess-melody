import {getElementFromTemplate} from '../utils';
// import getSecondScreen from '../second-screen/get-second-screen';
import header from '../header/header';
import {questions, checkAnswer} from '../data/game-data';
import {showGameScreen, checkArtistScreen} from '../change-screen/change-screen';


const getFirstScreen = (state, question) => {
  const template = `<section class="main main--level main--level-artist">
    ${header(state)}

    <div class="main-wrap">
      <h2 class="title main-title">Кто исполняет эту песню?</h2>
      <div class="player-wrapper">
        <div class="player">
          <audio src="${question.src}" autoplay preload="auto"></audio>
          <button class="player-control player-control--pause"></button>
          <div class="player-track">
            <span class="player-status"></span>
          </div>
        </div>
      </div>
      <form class="main-list">
      ${question.answers.reduce((acc, it, i) =>
    acc + `<div class="main-answer-wrapper">
          <input class="main-answer-r" type="radio" id="answer-${i}" name="answer" value="${it.artist}"/>
          <label class="main-answer" for="answer-${i}">
            <img class="main-answer-preview" src="${it.imageUrl}"
                 alt="Пелагея" width="134" height="134">
            ${it.artist}
          </label>
        </div>` + `\n`
      , ``)}
  </section>`;


  const firstScreen = getElementFromTemplate(template);
  const answersForm = firstScreen.querySelector(`.main-list`);
  const playerControl = firstScreen.querySelector(`.player-control`);
  const audio = firstScreen.querySelector(`audio`);
  answersForm.addEventListener(`change`, (evt) => {
    if (evt.target.name === `answer`) {
      state.answers.push(checkAnswer(checkArtistScreen(evt.target.value, question)));
      showGameScreen(state, questions);
    }
  });
  playerControl.addEventListener(`click`, (evt) => {
    if (evt.target.classList.contains(`player-control--pause`)) {
      audio.pause();
    } else if (evt.target.classList.contains(`player-control--play`)) {
      audio.play();
    }
    evt.target.classList.toggle(`player-control--pause`);
    evt.target.classList.toggle(`player-control--play`);
  });

  return firstScreen;
};

export default getFirstScreen;
