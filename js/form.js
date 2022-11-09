const REGEXP_HASHTAG = /^#[a-zа-яё0-9]{1,19}$/i; // начинается с #, содержит только русские и английские буквы и цифры, длина от 2 до 20 символов
const MAX_COUNT_HASHTAGS = 5;

const imgEditor = document.querySelector('.img-upload__overlay');
const uploadElement = document.querySelector('#upload-file');
const scaleElement = document.querySelector('.scale__control--value');
const effectElement = document.querySelector('.effect-level__value');
const effectOriginal = document.querySelector('#effect-none');
const hashtagsElement = document.querySelector('.text__hashtags');
const commentsElement = document.querySelector('.text__description');
const closeElement = document.querySelector('.img-upload__cancel');
const uploadForm = document.querySelector('.img-upload__form');


const showImgEditor = () => {
  imgEditor.classList.remove('hidden');
  document.body.classList.add('modal-open');
};


uploadElement.addEventListener('change', () => {
  showImgEditor();
});

const closeImgEditor = () => {
  imgEditor.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadElement.value = '';
  scaleElement.value = 100;
  effectOriginal.checked = true;
  hashtagsElement.value = '';
  commentsElement.value = '';
};

document.body.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    closeImgEditor();
  }
});

closeElement.addEventListener('click', closeImgEditor);

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
}, true);

const hashtagsValidatorAmount = (value) => {
  const hashtags = value.trim().split(' '); // Преобразуем строку в миссив
  return hashtags.length <= MAX_COUNT_HASHTAGS;
};
pristine.addValidator(hashtagsElement, hashtagsValidatorAmount, 'нельзя указать больше пяти хэш-тегов');

// const hashtagsValidatorDublicate = (value) => {
//   const hashtags = value.trim().split(' ');
//   for (let i = 0; i < hashtags.length; i++) {
//     const hashtag = hashtags[i].toLowerCase();
//     for (let j = i + 1; j < hashtags.length; j++) {
//       const hashtag2 = hashtags[j].toLowerCase();
//       if (hashtag === hashtag2) {
//         return false;
//       }
//     }
//   }
//   return true;
// };

/**
 * @param {string} value значение поля хэштег 
 * @returns {boolean} true - если нет одинаковых хэштегов
 */
const hashtagsValidatorDublicate = (value) => {
  const hashtags = value.trim().split(' ');
  const obj = {};
  hashtags.forEach((elem) => {
    obj[elem] = '';
  });
  return hashtags.length === Object.keys(obj).length; // Сравниваем количество элементов массива и количество ключей объекта
};

pristine.addValidator(hashtagsElement, hashtagsValidatorDublicate, 'один и тот же хэш-тег не может быть использован дважды');


/**
 * @param {string} value значение поля хэштег 
 * @returns {boolean} true - если все хэштеги валидны 
 */
const hashtagsValidatorRegExp = (value) => {
  const hashtags = value.trim().split(' ');
  return hashtags.every((elem) => REGEXP_HASHTAG.test(elem));
};

pristine.addValidator(hashtagsElement, hashtagsValidatorRegExp, 'Не соответсвует формату');

hashtagsElement.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
});

commentsElement.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
});

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  pristine.validate();
});

