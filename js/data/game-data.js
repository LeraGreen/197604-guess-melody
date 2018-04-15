export const settings = {
  maxMistakes: 3,
  screens: 10,
  timeToGame: 5 * 60,
  timeToEnd: 0
};

const AnswerType = {
  FAST: `fast`,
  CORRECT: `correct`,
  WRONG: `wrong`
};

export const initialState = {
  mistakes: 0,
  time: settings.timeToGame,
  question: 0,
  points: 0
};

export const currentState = {
  mistakes: 2,
  time: 5 * 60 - 1,
  question: 0,
  points: 0
};

const questions = [
  {
    type: `artist`,
    artist: `Kevin MacLeod`,
    src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
    answers: [
      {
        artist: `Kevin MacLeod`,
        imageUrl: ``
      },
      {
        artist: `Пелагея`,
        imageUrl: ``
      },
      {
        artist: `Кровосток`,
        imageUrl: ``
      }
    ]
  },
  {
    type: `genre`,
    genre: `Jazz`,
    answers: [
      {
        src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
        genre: `Rock`
      },
      {
        src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
        genre: `Jazz`
      },
      {
        src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
        genre: `Jazz`
      },
      {
        src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
        genre: `Rock`
      }
    ]
  }
];

export const statistics = [20, 19, 15, 4, 2];

export const tick = (state) => {
  if (state.time > settings.timeToEnd) {
    state.time--;
  }
  return state;
};

export const checkAnswer = (answerData) => {
  if (answerData.answer) {
    if (answerData.time < 30) {
      return `fast`;
    }
    return `correct`;
  }
  return `wrong`;
};

export const answerPoints = {};
answerPoints[AnswerType.WRONG] = -2;
answerPoints[AnswerType.CORRECT] = 1;
answerPoints[AnswerType.FAST] = 2;

export const calsPoints = (answers) => {
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
  let userPosition;
  for (let i = 0; i < otherResults.length; i++) {
    if (winners[i] < userPoints) {
      winners.splice(i, 0, userPoints);
      userPosition = i + 1;
      break;
    }
  }
  const percent = Math.round(((winners.length - userPosition) / winners.length) * 100);
  return {position: userPosition, players: winners.length, percent};
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
