import { createPhotoElement } from './photo.js';
import { showBigPicture } from './big-picture.js';
import { getPhotos } from './api.js';
import { showAlert, debounce } from './utilits.js';
import { showFilter, createEventListenersForFilter } from './filter.js';
import './form.js';

const renderPhoto = (photoDescriptions) => {
  const pictures = document.querySelector('.pictures');
  const fragment = document.createDocumentFragment();

  const photos = pictures.querySelectorAll('.picture');
  photos.forEach((photo) => {
    photo.remove();
  });

  photoDescriptions.forEach((attributes) => {
    const photoElement = createPhotoElement(attributes);
    photoElement.addEventListener('click', () => {
      showBigPicture(attributes);
    });
    fragment.appendChild(photoElement);
  });

  pictures.appendChild(fragment);

};

getPhotos((photoDescriptions) => {
  renderPhoto(photoDescriptions);
  createEventListenersForFilter(photoDescriptions, debounce(renderPhoto));
  showFilter();
}, () => {
  showAlert('Не удалось загрузить данные');
});
