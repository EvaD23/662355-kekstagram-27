const bigPicture = document.querySelector('.big-picture');
const COUNT_COMMENTS_SHOW = 5;


/**
 * Строит html код в виде строки, в котором содержится комментарии
 * @param {Object} attributes атрибуты фотографии
 * @returns {String} строка состаящая из li элементов для отображения коментариев
 */
const createCommentsHtml = (attributes, start, end) => attributes.comments
  .slice(start, end)
  .map((comment) =>
    `<li class="social__comment">
    <img
      class="social__picture"
      src="${comment.avatar}"
      alt="${comment.name}"
      width="35" height="35">
    <p class="social__text">${comment.message}</p>
  </li>`)
  .join(''); // Join используем, чтобы сделать 1 строку и использовать ее с innerHtml;


const showBigPicture = (attributes) => {
  bigPicture.classList.remove('hidden');
  const img = document.querySelector('.big-picture__img img');
  img.src = attributes.url;
  const likesCount = document.querySelector('.likes-count');
  likesCount.textContent = attributes.likes;
  const commentsCount = document.querySelector('.comments-count');
  commentsCount.textContent = attributes.comments.length;
  const numberComments = document.querySelector('#number-comment');
  numberComments.innerText = attributes.comments.length < COUNT_COMMENTS_SHOW ? attributes.comments.length : COUNT_COMMENTS_SHOW;
  const listComments = document.querySelector('.social__comments');

  const commentsHtml = createCommentsHtml(attributes, 0, COUNT_COMMENTS_SHOW);
  listComments.innerHTML = commentsHtml;
  const description = document.querySelector('.social__caption');
  description.textContent = attributes.description;
  document.body.classList.add('modal-open');

  const buttonLoadComments = document.querySelector('.social__comments-loader');
  let start = COUNT_COMMENTS_SHOW;
  buttonLoadComments.addEventListener('click', () => {

    const end = start + COUNT_COMMENTS_SHOW;
    listComments.innerHTML += createCommentsHtml(attributes, start, end);
    numberComments.innerText = attributes.comments.length < end ? attributes.comments.length : end;
    start += COUNT_COMMENTS_SHOW;
  });
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
