const appContainer = document.querySelector(`.app`);

export const getElementFromTemplate = (string) => {
  const template = document.createElement(`template`);
  template.innerHTML = string;
  return template.content;
};

export const showScreen = (element) => {
  const mainClass = '.main';
  const main = appContainer.querySelector(mainClass);
  if (main) {
    appContainer.replaceChild(element, main);
  } else {
    appContainer.insertBefore(element, appContainer.children[0]);
  }
};

// спросить как ещё лучше делать, если есть шаблонные строки
