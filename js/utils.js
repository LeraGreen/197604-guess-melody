const appContainer = document.querySelector(`.app`);

export const getElementFromTemplate = (string) => {
  const template = document.createElement(`template`);
  template.innerHTML = string;
  return template.content.children[0];
};

export const showScreen = (element) => {
  // TODO юзать element.element
  const mainClass = `.main`;
  const main = appContainer.querySelector(mainClass);
  if (main) {
    appContainer.removeChild(main);
  }
  appContainer.insertBefore(element, appContainer.children[0]);
};

export const getRandomFromArray = (array) => array[Math.floor(Math.random() * array.length)];
