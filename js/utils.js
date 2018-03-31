export const getElementFromTemplate = (string) => {
  const template = document.createElement(`template`);
  template.innerHTML = string;
  return template.content;
};

// спросить как ещё лучше делать, если есть шаблонные строки
