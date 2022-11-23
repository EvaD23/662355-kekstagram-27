
const showSuccessMessage = () => {
  const message = document.querySelector('#success')
    .content
    .querySelector('.success')
    .cloneNode(true);
  const removeMessage = (evt) => {
    if (evt.key === 'Escape' || evt.type === 'click') {
      document.removeEventListener('keydown', removeMessage);
      message.removeEventListener('click', removeMessage);
      message.remove();
    }
  };
  const successButton = message.querySelector('.success__button');
  successButton.addEventListener('click', removeMessage);
  document.addEventListener('keydown', removeMessage);
  document.body.appendChild(message);
};

const showErrorMessage = () => {
  const message = document.querySelector('#error')
    .content
    .querySelector('.error')
    .cloneNode(true);
  const removeMessage = (evt) => {
    if (evt.key === 'Escape' || evt.type === 'click') {
      document.removeEventListener('keydown', removeMessage);
      message.removeEventListener('click', removeMessage);
      message.remove();
    }
  };
  const successButton = message.querySelector('.error__button');
  successButton.addEventListener('click', removeMessage);
  document.addEventListener('keydown', removeMessage);
  document.body.appendChild(message);
};

export { showSuccessMessage, showErrorMessage };
