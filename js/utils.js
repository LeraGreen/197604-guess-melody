const appContainer = document.querySelector(`.app`);

export const getElementFromTemplate = (string) => {
  const template = document.createElement(`template`);
  template.innerHTML = string;
  return template.content.children[0];
};

export const showScreen = (view) => {
  const mainClass = `.main`;
  const main = appContainer.querySelector(mainClass);
  if (main) {
    appContainer.removeChild(main);
  }
  appContainer.insertBefore(view.element, appContainer.children[0]);
};

export const getRandomFromArray = (array) => array[Math.floor(Math.random() * array.length)];

export const addLeadingZero = (number) => {
  return number >= 10 ? number : `0` + number;
};
