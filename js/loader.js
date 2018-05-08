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
  constructor() {
    this._counter = null;
  }

  loadData() {
    return fetch(`${SERVER_URL}questions`).
        then((response) => checkStatus(response)).
        then((response) => response.json()).
        then(this.onDataLoad);
  }

  preloadAudio(data) {
    const audioSources = new Set();
    for (const it of data) {
      if (it.type === `artist`) {
        audioSources.add(it.src);
      }
      if (it.type === `genre`) {
        for (const item of it.answers) {
          audioSources.add(item.src);
        }
      }
    }

    this._counter = audioSources.size;

    for (const source of audioSources) {
      const audio = new Audio();
      audio.preload = `auto`;
      audio.addEventListener(`canplaythrough`, this.canPlayThroughListener.bind(this));
      audio.addEventListener(`error`, this.errorListener.bind(this));
      audio.src = source;
      audio.load();
    }
  }

  checkCounter() {
    return this._counter === 0;
  }

  checkAudio() {
    this._counter--;
    if (this.checkCounter()) {
      this.onAudioPreload();
    }
  }

  canPlayThroughListener() {
    this.checkAudio();
    removeEventListener(`error`, this.checkAudio);
  }

  errorListener() {
    this.checkAudio();
    removeEventListener(`canplaythrough`, this.checkAudio);
  }

  onDataLoad() {
  }

  onAudioPreload() {
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
