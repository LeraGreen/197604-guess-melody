const appContainer = document.querySelector(`.app`);

export const getElementFromTemplate = (string) => {
  const template = document.createElement(`template`);
  template.innerHTML = string;
  return template.content;
};

export const showScreen = (element) => {
  const mainClass = `.main`;
  const main = appContainer.querySelector(mainClass);
  if (main) {
    appContainer.replaceChild(element, main);
  } else {
    appContainer.insertBefore(element, appContainer.children[0]);
  }
};

// спросить как ещё лучше делать, если есть шаблонные строки
// спросить про повторное отображение экрана
// в прошлом проекте было так, но в этом это не работает

// export const showScreen = (array) => {
//   const container = document.querySelector(`.central`);
//   container.innerHTML = ``;
//   for (const element of array) {
//     container.appendChild(element);
//   }
// };
//
// export const createContent = (string) => {
//   const container = document.createElement(`template`);
//   container.innerHTML = string;
//   return container.content;
// };
//
//
// export const createArray = (nodes) => {
//   return Array.from(nodes);
// };
