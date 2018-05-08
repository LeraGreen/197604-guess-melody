export const SETTINGS = Object.freeze({
  maxMistakes: 3,
  lastScreen: 0,
  timeToGame: 35,
  timeToEnd: 0,
  timeToAlarm: 30
});

export const FAST_ANSWER_TIME = 30;

export const AnswerType = {
  FAST: `fast`,
  CORRECT: `correct`,
  WRONG: `wrong`
};

export const INITIAL_STATE = Object.freeze({
  mistakes: 0,
  time: SETTINGS.timeToGame,
  question: -1,
  answers: []
});

export const answerPoints = {
  [AnswerType.WRONG]: -2,
  [AnswerType.CORRECT]: 1,
  [AnswerType.FAST]: 2
};

