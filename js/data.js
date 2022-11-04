import { getRandomPositiveInteger, getCounterFn, getRandomElement } from './utilits.js';

const descriptions = ['Great photo', 'Nice photo', 'Awesome photo'];
const names = ['Andrei', 'Eva', 'Alisa', 'Kristina', 'Oleg'];
const messages = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.Как можно было поймать такой неудачный момент ?!'];

const getPhotoId = getCounterFn();
const getCommentId = getCounterFn();

/**
 * @returns {string[]} массив с 1 или 2 сообщениями
 */
const getRandomMessages = () => {
  // присваиваем рандомное число от 0 до длины масива, они будут являтся рандомными индексами массива message
  const i = getRandomPositiveInteger(0, messages.length - 1);
  const j = getRandomPositiveInteger(0, messages.length - 1);
  if (i === j) {
    return [messages[i]];
  }
  return [messages[i], messages[j]];
};

// Круглые скобки добавляются в случае, когда стрелочная функция только создает объект.
const createComment = () => ({
  id: getCommentId(),
  avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
  message: getRandomMessages(),
  name: getRandomElement(names)
});


const createDescriptionPhoto = () => {
  const id = getPhotoId(); // Константа нужна, чтобы использовать в двух местаъ один id (нужно по заданию);
  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: getRandomElement(descriptions),
    likes: getRandomPositiveInteger(15, 200),
    comments: Array.from({ length: getRandomPositiveInteger(1, 5) }, createComment)

  };
};

export { createDescriptionPhoto };


