import GamePresenter from './game-presenter/game-presenter';

export const loadData = () => {
  fetch(`https://es.dump.academy/guess-melody/questions`).
      then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(`Неизвестный статус: ${response.status}${response.statusText}`);
      }).
      then((data) => new GamePresenter(data).init()).
      catch((err) => window.console.error(err));
};

export const sendStatistics = (points) => {
  fetch(`https://es.dump.academy/guess-melody/stats/:197604`, {
    method: `POST`,
    body: JSON.stringify({
      'points': points
    }),
    headers: {
      'Content-Type': `application/json`
    }
  }).
      then((response) => window.console.log(response.ok ? `Sent` : `Not sent`)).
      catch((err) => window.console.error(err));
};

export const loadStatistics = () => {
  return fetch(`https://es.dump.academy/guess-melody/stats/:197604`).
      then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(`Неизвестный статус: ${response.status}${response.statusText}`);
      });
};


loadData();

