const ALERT_SHOW_TIME = 4000;

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

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.classList.add('modal-alert');
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const shuffle = (unshuffled) => unshuffled
  .map((value) => ({ value, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(({ value }) => value);

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};


export { getRandomPositiveInteger, isCorrectLength, getCounterFn, getRandomElement, showAlert, shuffle, debounce };
