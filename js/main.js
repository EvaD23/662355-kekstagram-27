import { createDescriptionPhoto } from './data.js';
import { createPhotoElement } from './photo.js';
import { showBigPicture } from './big-picture.js';

const photoDescriptions = Array.from({ length: 25 }, createDescriptionPhoto);

const pictures = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();

photoDescriptions.forEach((attributes) => {
  const photoElement = createPhotoElement(attributes);
  photoElement.addEventListener('click', () => {
    showBigPicture(attributes);
  });
  fragment.appendChild(photoElement);
});

pictures.appendChild(fragment);
