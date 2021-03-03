import {
  deleteElement,
  isEscEvent
} from './util.js';

const showMassage = (text) => {
  const markup = `<div class="alert">
  <div class="overlay"></div>
  <div class="alert__box">
  <p class="alert__message">${text}</p>
  <!-- <button class="reset-button" type="button">Попробовать ещё раз</button> -->
  <button class="close-button" type="button">OK</button>
  </div>
  </div>`;
  document.body.insertAdjacentHTML('afterbegin', markup);
  const alert = document.querySelector('.alert');
  const closeButton = alert.querySelector('.close-button')

  const onCloseButtonClick = () => {
    deleteElement(alert)
    document.removeEventListener('keydown', onEscKeydown);
  };

  const onEscKeydown = (evt) => {
    if(isEscEvent(evt)) {
      deleteElement(alert)
      document.removeEventListener('keydown', onEscKeydown);
    }
  };

  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onEscKeydown);
};


const showSuccessMessage = () => {
  const template = document.querySelector('#success').content.cloneNode(true);
  document.body.appendChild(template);
  document.querySelector('.success').setAttribute('style', 'z-index: 9999;')
};

const showErrorMessage = () => {
  const template = document.querySelector('#error').content.cloneNode(true);
  document.body.appendChild(template);
  document.querySelector('.error').setAttribute('style', 'z-index: 9999;')
};

export {
  showMassage,
  showSuccessMessage,
  showErrorMessage
};