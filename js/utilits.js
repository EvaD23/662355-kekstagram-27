
/**
 * @param {string} str
 * @param {number} maxLength
 * @returns {boolean} если длина строки меньше или равна максимальной длине, возвращается true;
 */
const isCorrectLength = (str, maxLength) => str.length <= maxLength;


/**
 * Функция возвращающая случайное целое число из приведенного диапазона
 * @param {number} a -  начало диапазона
 * @param {number} b  - конец диапозона
 * @returns {number} случайное целое число из приведенного диапазона
 */
const getRandomPositiveInteger = (a, b) => {
  // Если переданы отрицительные числа, возвращаем NaN
  if (a < 0 || b < 0) {
    return NaN;
  }
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

/**
 * @return {function} Функция, которая возвращает число и при каждом вызове, это число больше предыдущего на 1.
 */
const getCounterFn = () => {
  let number = 1;
  return () => number++;
};

const getRandomElement = (array) => array[getRandomPositiveInteger(0, array.length - 1)];


export { getRandomPositiveInteger, isCorrectLength, getCounterFn, getRandomElement };
