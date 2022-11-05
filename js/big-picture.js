const bigPicture = document.querySelector('.big-picture');

/**
 * Строит html код в виде строки, в котором содержится комментарии
 * @param {Object} attributes атрибуты фотографии
 * @returns {String} строка состаящая из li элементов для отображения коментариев
 */
const createCommentsHtml = (attributes) => attributes.comments.map((comment) =>
  `<li class="social__comment">
    <img
      class="social__picture"
      src="${comment.avatar}"
      alt="${comment.name}"
      width="35" height="35">
    <p class="social__text">${comment.message}</p>
  </li>`)
  .join(''); // Join используем, чтобы сделать 1 строку и использовать ее с innerHtml

const showBigPicture = (attributes) => {
  bigPicture.classList.remove('hidden');
  const img = document.querySelector('.big-picture__img img');
  img.src = attributes.url;
  const likesCount = document.querySelector('.likes-count');
  likesCount.textContent = attributes.likes;
  const commentsCount = document.querySelector('.comments-count');
  commentsCount.textContent = attributes.comments.length;
  const listComments = document.querySelector('.social__comments');

  const commentsHtml = createCommentsHtml(attributes);
  listComments.innerHTML = commentsHtml;
  const description = document.querySelector('.social__caption');
  description.textContent = attributes.description;
  document.body.classList.add('modal-open');
};

const closeIcon = document.querySelector('.big-picture__cancel');

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

closeIcon.addEventListener('click', closeBigPicture);

document.body.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
});

export { showBigPicture };
