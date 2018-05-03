export const settings = {
  maxMistakes: 3,
  screens: 4,
  timeToGame: 5 * 60,
  timeToEnd: 0
};

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

export const answerPoints = {
  [AnswerType.WRONG]: -2,
  [AnswerType.CORRECT]: 1,
  [AnswerType.FAST]: 2
};


export const splitTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return {'minutes': minutes, 'seconds': remainingSeconds};
};

