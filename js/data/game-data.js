export const settings = {
  maxMistakes: 3,
  screens: 4,
  timeToGame: 5 * 60,
  timeToEnd: 0
};

const FAST_ANSWER_TIME = 30;

export const AnswerType = {
  FAST: `fast`,
  CORRECT: `correct`,
  WRONG: `wrong`
};

export const initialState = {
  mistakes: 0,
  time: settings.timeToGame,
  question: 0,
  answers: []
};

export const questions = [
  {
    type: `artist`,
    artist: `Kevin MacLeod`,
    src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
    answers: [
      {
        artist: `Kevin MacLeod`,
        imageUrl: `http://placehold.it/134x134`
      },
      {
        artist: `Пелагея`,
        imageUrl: `http://placehold.it/134x134`
      },
      {
        artist: `Кровосток`,
        imageUrl: `http://placehold.it/134x134`
      }
    ]
  },
  {
    type: `genre`,
    genre: `Jazz`,
    answers: [
      {
        src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
        genre: `Rock`,
        name: `Travel Light`
      },
      {
        src: `https://www.youtube.com/audiolibrary_download?vid=a127d9b7de8a17cf`,
        genre: `Jazz`,
        name: `Travel Light`
      },
      {
        src: `https://www.youtube.com/audiolibrary_download?vid=dfb828f40096184c`,
        genre: `Jazz`,
        name: `Travel Light`
      },
      {
        src: `https://www.youtube.com/audiolibrary_download?vid=bcbe5be936a32fb1`,
        genre: `Rock`,
        name: `Travel Light`
      }
    ]
  },
  {
    type: `artist`,
    artist: `Kevin MacLeod`,
    src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
    answers: [
      {
        artist: `Kevin MacLeod`,
        imageUrl: `http://placehold.it/134x134`
      },
      {
        artist: `Пелагея`,
        imageUrl: `http://placehold.it/134x134`
      },
      {
        artist: `Кровосток`,
        imageUrl: `http://placehold.it/134x134`
      }
    ]
  },
  {
    type: `artist`,
    artist: `Kevin MacLeod`,
    src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
    answers: [
      {
        artist: `Kevin MacLeod`,
        imageUrl: `http://placehold.it/134x134`
      },
      {
        artist: `Пелагея`,
        imageUrl: `http://placehold.it/134x134`
      },
      {
        artist: `Кровосток`,
        imageUrl: `http://placehold.it/134x134`
      }
    ]
  }
];

export const statistics = [20, 19, 15, 4, 2];

export const checkAnswer = (answer, time) => {
  if (answer) {
    if (time <= FAST_ANSWER_TIME) {
      return `fast`;
    }
    return `correct`;
  }
  return `wrong`;
};

export const answerPoints = {
  [AnswerType.WRONG]: -2,
  [AnswerType.CORRECT]: 1,
  [AnswerType.FAST]: 2
};

export const calcPoints = (answers) => {
  let points = 0;
  for (const answer of answers) {
    points += answerPoints[answer];
  }
  if (points < 0) {
    points = -1;
  }
  return points;
};

export const getStatistics = (userResult, gameSettings, otherResults) => {
  if (userResult.level < settings.screens) {
    if (!userResult.remainingTime) {
      return `Время вышло! Вы не успели отгадать все мелодии`;
    }
    if (!userResult.remainingLives) {
      return `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;
    }
  }
  const winnerResult = getWinnerStatistics(userResult.points, otherResults);
  return `Вы заняли ${winnerResult.position} место из ${winnerResult.players} игроков. Это лучше, чем у ${winnerResult.percent}% игроков!`;
};

export const getWinnerStatistics = (userPoints, otherResults) => {
  const winners = otherResults.slice(0);
  const winnersQuantity = winners.length;
  let userPosition;
  for (let i = 0; i < otherResults.length; i++) {
    if (winners[i] < userPoints) {
      winners.splice(i, 0, userPoints);
      userPosition = i + 1;
      break;
    }
  }

  if (winners.length === winnersQuantity) {
    winners.push(userPoints);
    userPosition = winners.length;
  }
  const percent = Math.round(((winners.length - userPosition) / winners.length) * 100);
  return {position: userPosition, players: winners.length, percent};

  // TODO отловить случаи с отрицательным значением
};

export const upMistake = (state) => {
  if (state.mistakes < settings.maxMistakes) {
    state.mistakes++;
  }
  return state;
};

export const splitTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return {'minutes': minutes, 'seconds': remainingSeconds};
};

export const calcAnswersType = (array, type) => array.filter((el) => el === type).length;
