const KeyCode = {
  ARROW_LEFT: 37,
  ARROW_RIGHT: 39
};

const checkNumberInRange = (number, min, max) => number >= min && number <= max;

const checkKeyModifier = (evt, button) => evt.altKey && evt.keyCode === button;

const getChangeScreenFn = () => {
  const appContainer = document.querySelector(`.app`);
  const mainContainer = appContainer.querySelector(`.main`);
  const templateContent = document.getElementById(`templates`).content;
  const screens = Array.from(templateContent.querySelectorAll(`.main`));
  const minValue = 0;
  const maxValue = screens.length - 1;
  let pointer = -1;

  const showScreen = (screen) => {
    mainContainer.innerHTML = screen.innerHTML;
  };

  return (isNext) => {
    const number = isNext ? pointer + 1 : pointer - 1;
    if (checkNumberInRange(number, minValue, maxValue)) {
      pointer = number;
      showScreen(screens[pointer]);
    }
  };
};

document.addEventListener(`keydown`, (evt) => {
  if (checkKeyModifier(evt, KeyCode.ARROW_LEFT)) {
    changeScreen(false);
  }
});

document.addEventListener(`keydown`, (evt) => {
  if (checkKeyModifier(evt, KeyCode.ARROW_RIGHT)) {
    changeScreen(true);
  }
});

const changeScreen = getChangeScreenFn();
changeScreen(true);
