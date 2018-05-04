export const settings = {
  maxMistakes: 3,
  screens: 0,
  timeToGame: 5 * 60,
  timeToEnd: 0,
  timeToAlarm: 30
};

// TODO как указать количество экранов

export const FAST_ANSWER_TIME = 30;

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

export const statistics = [20, 19, 15, 4, 2];

export const answerPoints = {
  [AnswerType.WRONG]: -2,
  [AnswerType.CORRECT]: 1,
  [AnswerType.FAST]: 2
};

