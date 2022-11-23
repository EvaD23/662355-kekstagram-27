const GET_DATA_URL = 'https://27.javascript.pages.academy/kekstagram/data';
const SEND_DATA_URL = 'https://27.javascript.pages.academ/kekstagram';

const getPhotos = (onSuccess, onError) => {
  fetch(GET_DATA_URL)
    .then((response) => response.json())
    .then((descriptionPhotos) => {
      onSuccess(descriptionPhotos);
    })
    .catch(onError);
};

const sendForm = (dataPhoto,onSuccess, onError) => {
  fetch(SEND_DATA_URL, {
    method: 'POST',
    body: dataPhoto
  },
  )
    .then(() => onSuccess())
    .catch(() => onError());
};

export { getPhotos, sendForm };
