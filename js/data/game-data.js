export const timer = {
  currentTime: 0,
  isFinished: false,
  maxTime: 60 * 5
};

export const initialState = {
  mistakes: 0,
  time: timer.maxTime,
  currentQuestion: 0
};

export const currentState = {
  mistakes: 0,
  time: 0,
  currentQuestion: 0
};

export const tick = (gameTimer) => {
  if (gameTimer.currentTime > 0) {
    gameTimer.currentTime--;
  } else {
    gameTimer.isFinished = true;
  }
  return gameTimer;
};

export const settings = {
  maxLives: 3,
  screens: 10,
  timeToGame: 5 * 60 // five minutes
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

const AnswerType = {
  FAST: `fast`,
  CORRECT: `correct`,
  WRONG: `wrong`
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
  otherResults.push(userPoints);
  const winners = otherResults.sort((a, b) => b - a);
  const userPosition = winners.indexOf(userPoints) + 1;
  const percent = Math.round(((winners.length - userPosition) / winners.length) * 100);
  return {position: userPosition, players: winners.length, percent};
};
