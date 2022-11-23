import { shuffle } from './utilits.js';

const filterElement = document.querySelector('.img-filters');
const showFilter = () => filterElement.classList.remove('img-filters--inactive');

const createEventListenersForFilter = (photoDescriptions, renderPhoto) => {
  const randomButton = filterElement.querySelector('#filter-random');
  randomButton.addEventListener('click', () => {
    const randomPhotos = shuffle(photoDescriptions).slice(0, 10);
    renderPhoto(randomPhotos);
  });
  const defaultButton = filterElement.querySelector('#filter-default');
  defaultButton.addEventListener('click', () => {
    renderPhoto(photoDescriptions);
  });
  const discussedButton = filterElement.querySelector('#filter-discussed');
  discussedButton.addEventListener('click', () => {
    const discussedPhotos = [...photoDescriptions].sort((photo1, photo2) => photo2.comments.length - photo1.comments.length);
    renderPhoto(discussedPhotos);
  });
};

export { showFilter, createEventListenersForFilter };
