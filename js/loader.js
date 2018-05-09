const SERVER_URL = `https://es.dump.academy/guess-melody/`;
const APP_ID = 197604;

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  } else {
    throw new Error(`Неизвестный статус: ${response.status}: ${response.statusText}`);
  }
};


class Loader {
  static loadData() {
    return fetch(`${SERVER_URL}questions`).
        then((response) => checkStatus(response)).
        then((response) => response.json());
  }

  static preloadAudio(sources) {
    return Promise.all(sources.map(((src) => new Promise((resolve, reject) => {
      const audio = new Audio();
      audio.preload = `auto`;

      audio.addEventListener(`canplaythrough`, resolve);
      audio.addEventListener(`error`, reject);

      audio.src = src;
    }))));
  }

  static sendStatistics(points) {
    fetch(`${SERVER_URL}stats/${APP_ID}`, {
      method: `POST`,
      body: JSON.stringify({
        'points': points
      }),
      headers: {
        'Content-Type': `application/json`
      }
    }).
        then((response) => checkStatus(response));
  }

  static loadStatistics() {
    return fetch(`${SERVER_URL}stats/${APP_ID}`).
        then((response) => checkStatus(response)).
        then((response) => response.json());
  }
}

export default Loader;
