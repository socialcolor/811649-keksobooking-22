import {
  deleteElement,
  isEscEvent
} from './util.js';

const templateSuccess = document.querySelector('#success');
const templateError = document.querySelector('#error')

const showMassage = (text) => {
  const markup = `<div class="alert">
  <div class="overlay"></div>
  <div class="alert__box">
  <p class="alert__message">${text}</p>
  <button class="close-button" type="button">OK</button>
  </div>
  </div>`;
  document.body.insertAdjacentHTML('afterbegin', markup);
  const alert = document.querySelector('.alert');

  const onAlertClick = () => {
    deleteElement(alert)
    document.removeEventListener('keydown', onEscKeydown);
  };
  const onEscKeydown = (evt) => {
    if(isEscEvent(evt)) {
      deleteElement(alert)
      document.removeEventListener('keydown', onEscKeydown);
    }
  };
  document.addEventListener('keydown', onEscKeydown);
  alert.addEventListener('click', onAlertClick);
};


const showSuccessMessage = () => {
  const template = templateSuccess.content.cloneNode(true);
  document.body.appendChild(template);
};

const showErrorMessage = () => {
  const template = templateError.content.cloneNode(true);
  document.body.appendChild(template);
};

export {
  showMassage,
  showSuccessMessage,
  showErrorMessage
};