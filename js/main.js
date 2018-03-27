const app = document.querySelector(`.app`);
const mainContainer = app.querySelector(`.main`);
const template = document.getElementById(`templates`);
const templateContent = template.content;
const templatesCollection = templateContent.querySelectorAll(`.main`);
const screens = [];
const arrowLeft = 37;
const arrowRight = 39;
let pointer = 0;

for (const screen of templatesCollection) {
  screens.push(screen);
}

const min = 0;
const max = screens.length - 1;

const showScreen = function (number) {
  if (number >= min && number <= max) {
    mainContainer.innerHTML = screens[number].innerHTML;
  }
};

showScreen(min);

document.addEventListener(`keydown`, function (event) {
  if (event.altKey && event.keyCode === arrowLeft) {
    changePointer(pointer - 1);
  }
});

document.addEventListener(`keydown`, function (event) {
  if (event.altKey && event.keyCode === arrowRight) {
    changePointer(pointer + 1);
  }
});

const changePointer = (number) => {
  if (number >= min && number <= max) {
    pointer = number;
    showScreen(pointer);
  }
};
