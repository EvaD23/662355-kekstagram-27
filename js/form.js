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
const buttonControlSmall = document.querySelector('.scale__control--smaller');
const buttonControlBig = document.querySelector('.scale__control--bigger');
const scaleImg = document.querySelector('.img-upload__preview img');
const sliderElement = document.querySelector('.effect-level__slider');
const buttonsEffect = document.querySelectorAll('.effects__radio:not(#effect-none)');
const filterValue = document.querySelector('.effect-level__value');
const sliderContainer = document.querySelector('.img-upload__effect-level');


const showImgEditor = () => {
  imgEditor.classList.remove('hidden');
  document.body.classList.add('modal-open');
  sliderContainer.classList.add('hidden');
};

uploadElement.addEventListener('change', () => {
  showImgEditor();
});

const changeScale = (scale) => {
  const scaleValue = scale / 100;
  scaleImg.style.transform = `scale(${scaleValue})`;
};

const closeImgEditor = () => {
  imgEditor.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadElement.value = '';
  scaleElement.value = '100%';
  changeScale(100);
  effectOriginal.checked = true;
  hashtagsElement.value = '';
  commentsElement.value = '';
  effectElement.value = '';
  filterValue.value = '';

  document.body.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closeImgEditor();
    }
  });
};

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

buttonControlSmall.addEventListener('click', () => {
  let scaleValue = +scaleElement.value.slice(0, -1); // Сделать масштаб картинки меньше
  if (scaleValue > 25) {
    scaleValue = scaleValue - 25;
    scaleElement.value = `${scaleValue}%`;
    changeScale(scaleValue);
  }
});

buttonControlBig.addEventListener('click', () => {
  let scaleValue = +scaleElement.value.slice(0, -1); // Сделать масштаб картинки больше
  if (scaleValue < 100) {
    scaleValue = scaleValue + 25;
    scaleElement.value = `${scaleValue}%`;
    changeScale(scaleValue);
  }
});

noUiSlider.create(sliderElement, {
  start: 0,
  connect: 'lower',
  range: {
    'min': 0,
    'max': 100
  }
});

const standartFormat = {
  to: (value) => new String(value),
  from: (value) => new Number(value)
};

const effectsOptions = {
  chrome: {
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    start: 1,
    format: standartFormat
  },
  sepia: {
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    start: 1,
    format: standartFormat
  },
  marvin: {
    range: {
      min: 0,
      max: 100,
    },
    step: 1,
    start: 100,
    format: {
      to: function (value) {
        return `${value}%`;
      },
      from: function (value) {
        return new Number(value);
      }
    }

  },
  phobos: {
    range: {
      min: 0,
      max: 3,
    },
    step: 0.1,
    start: 3,
    format: {
      to: function (value) {
        return `${value}px`;
      },
      from: function (value) {
        return new Number(value);
      }
    }
  },
  heat: {
    range: {
      min: 1,
      max: 3,
    },
    step: 0.1,
    start: 3,
    format: standartFormat
  }
};

const startValues = {
  chrome: 1,
  sepia: 1,
  marvin: '100%',
  phobos: '3px',
  heat: 3
};

const effectsStyle = {
  chrome: 'grayscale',
  sepia: 'sepia',
  marvin: 'invert',
  phobos: 'blur',
  heat: 'brigthness'
};


effectOriginal.addEventListener('change', () => {
  scaleImg.className = ''; // cброс класса
  scaleImg.style.filter = ''; // сбор значения фильтра
  filterValue.value = ''; // сбрасываем скрытй input
  sliderContainer.classList.add('hidden'); //скрываем слайдер

});

buttonsEffect.forEach((button) => {
  button.addEventListener('change', () => {
    sliderContainer.classList.remove('hidden'); // раскрываем слайдер
    scaleImg.className = ''; // сбрасываем класс
    scaleImg.style.filter = ''; // сбрасываем стиль
    sliderElement.noUiSlider.updateOptions(effectsOptions[button.value]); // обновляем слайдер с помощью объекта effectOptions
    scaleImg.classList.add(`effects__preview--${button.value}`); // добавляем нужный класс
    scaleImg.style.filter = `${effectsStyle[button.value]}(${startValues[button.value]})`; // добавляем нужный стиль в класс

  });
});

sliderElement.noUiSlider.on('change', (values) => {
  filterValue.value = values[0]; // записываем в input  значение из полоски слайдера
  const buttonsChecked = document.querySelectorAll('.effects__radio');
  for (let i = 0; i < buttonsChecked.length; i++) {
    if (buttonsChecked[i].checked) { // Перебираем кнопки и для выбранной кнопки накидываем стиль
      scaleImg.style.filter = `${effectsStyle[buttonsChecked[i].value]}(${values[0]})`;
      break;
    }
  }
});


