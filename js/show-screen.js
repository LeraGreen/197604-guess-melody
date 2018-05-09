const appContainer = document.querySelector(`.app`);

export const showScreen = (view) => {
  const main = appContainer.querySelector(`.main`);
  if (main) {
    appContainer.removeChild(main);
  }
  appContainer.insertBefore(view.element, appContainer.children[0]);
};
