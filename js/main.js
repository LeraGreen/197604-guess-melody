import {GamePresenter} from './game-presenter/game-presenter';

fetch(`https://es.dump.academy/guess-melody/questions`).
    then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`Неизвестный статус: ${response.status}${response.statusText}`);
    }).
    then((data) => new GamePresenter(data).init()).
    catch((err) => console.error(err));

// TODO Сделать вывод ошибки
// TODO Сделать прелоад картинок и всякого чтобы не было пустоты
// TODO Сделать мигание таймера
// TODO Сделать плавное сползание таймера
// TODO делать запрос каждый раз, когда игра эт самое

