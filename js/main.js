let pointer = 0;
const app = document.querySelector(`.app`);
const mainContainer = app.querySelector(`.main`);
const template = document.getElementById(`templates`);
const templateContent = template.content;
const templatesCollection = templateContent.querySelectorAll(`.main`);
const templates = [];
const arrowLeft = 37;
const arrowRight = 39;

const min = 0;
const max = templates.length;

for (const template of templatesCollection) {
  templates.push(template);
}
console.log(templates);

const showScreen = (number) => {
  if (number >= min && number <= max) {
    mainContainer.innerHTML = templates[number].innerHTML;
  } else {
    return false;
  }
}

showScreen(0);

document.addEventListener(`keydown`, (event) => {
  console.log(event.keyCode);
  if (event.altKey && event.keyCode === arrowLeft) {
    changePointer(pointer - 1);
    showScreen(pointer);
  }
});

document.addEventListener(`keydown`, (event) => {
  console.log(event.keyCode);
  if (event.altKey && event.keyCode === arrowRight) {
    changePointer(pointer + 1);
    showScreen(pointer);
  }
});

const changePointer = (number) => {
  if (number >= min && number <= max) {
    pointer = number;
  }
};
