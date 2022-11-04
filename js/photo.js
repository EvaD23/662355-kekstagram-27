/**
 *  Функиця принимает описание фоторгафии и создает по ним html элемент
 * @param {Object} attributes описание фото
 * @returns {HtmlElement} заполненный данными html элемент
 */
const createPhotoElement = (attributes) => {
  // Вытаскиваем содержимое шаблона
  const template = document.querySelector('#picture').content;
  const link = template.querySelector('.picture');

  // Необходимо клонирование, чтобы сам шаблон не менялся
  const card = link.cloneNode(true);
  const img = card.querySelector('.picture__img');
  img.src = attributes.url;
  const likes = card.querySelector('.picture__likes');
  likes.textContent = attributes.likes;
  const comments = card.querySelector('.picture__comments');
  comments.textContent = attributes.comments.length;

  return card;
};

export { createPhotoElement };
