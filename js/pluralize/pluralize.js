const WORDS_LENGTH = 3;

export default (number, words, unit = ``) => {
  if (words.length !== WORDS_LENGTH) {
    return `${number}`;
  }

  let numeral = words[1];

  if (number >= 11 && number <= 14) {
    numeral = words[0];
  } else {
    const remainder = number % 10;

    if (remainder === 0) {
      numeral = words[0];
    } else if (remainder >= 2 && remainder <= 4) {
      numeral = words[2];
    } else if (remainder >= 5 && remainder <= 9) {
      numeral = words[0];
    }
  }

  return `${number}${unit} ${numeral}`;
};
