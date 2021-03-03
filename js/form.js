import {
  offerType
} from './data.js';
import {
  changeElementState,
  isEscEvent,
  deleteElement
} from './util.js';
import {
  sendData
} from './api.js';
import {
  showSuccessMessage,
  showErrorMessage
} from './modal.js';

const MAX_ROOM = 100;
const MIN_ROOM = 0;
const form = document.querySelector('.ad-form');
const housingType = form.querySelector('#type');
const housingPrice = form.querySelector('#price');
const checkin = form.querySelector('#timein');
const checkout = form.querySelector('#timeout');
const address = form.querySelector('#address');
const title = form.querySelector('#title');
const roomNumber = form.querySelector('#room_number');
const guestNumber = form.querySelector('#capacity');
const description = form.querySelector('#description');
const features = form.querySelectorAll('.features input');
const resetButton = form.querySelector('.ad-form__reset');

const changeFormState = (state) => {
  const formElements = form.querySelectorAll('input, select, textarea, button');
  state ? form.classList.add('ad-form--disabled') : form.classList.remove('ad-form--disabled');
  changeElementState(formElements, state);
};

changeFormState(true);

const setPriceSettings = () => {
  const price = offerType[housingType.value].price;
  housingPrice.placeholder = price;
  housingPrice.setAttribute('min', price);
};

const onDocumentLoad = () => {
  setPriceSettings()
};
const onHousingTypeChange = () => setPriceSettings();

document.addEventListener('DOMContentLoaded', onDocumentLoad);
housingType.addEventListener('change', onHousingTypeChange);

const syncTimeValues = (from, to) => to.value = from.value;

const onCheckinChange = () => syncTimeValues(checkin, checkout);
const onCheckoutChange = () => syncTimeValues(checkout, checkin);

checkin.addEventListener('change', onCheckinChange);
checkout.addEventListener('change', onCheckoutChange);

const onTitileInput = () => {
  if (title.validity.tooShort) {
    title.setCustomValidity(`Ещё ${title.minLength -title.value.length} симв.`);
  } else if (title.validity.tooLong) {
    title.setCustomValidity(`Максимальная длина превышена на ${title.maxLenght - title.nodeValue.length} симв.`);
  } else {
    title.setCustomValidity('');
  }
  title.reportValidity();
};
title.addEventListener('input', onTitileInput);

const onPriceInput = () => {
  const price = Number(housingPrice.value);
  const priceMin = Number(housingPrice.min);
  const priceMax = Number(housingPrice.max);
  if (price < priceMin) {
    housingPrice.setCustomValidity(`Минимальная цена ${priceMin}`);
  } else if (price > priceMax) {
    housingPrice.setCustomValidity(`Максимальная цена ${priceMax}`);
  } else {
    housingPrice.setCustomValidity('');
  }
  housingPrice.reportValidity();
}
housingPrice.addEventListener('input', onPriceInput);

const validateRoomsAndGuest = () => {
  const rooms = Number(roomNumber.value);
  const geusts = Number(guestNumber.value);
  if (rooms < geusts && geusts !== MIN_ROOM) {
    roomNumber.setCustomValidity(`Для ${rooms} ${rooms == 1 ? 'комнаты' : 'комнат'} слишком много гостей`);
  } else if (geusts === MIN_ROOM) {
    roomNumber.setCustomValidity('Такое количество комнат не для гостей');
  } else {
    roomNumber.setCustomValidity('');
  }
  roomNumber.reportValidity();
};

const onRoomChange = () => validateRoomsAndGuest();
const onGuestChange = () => validateRoomsAndGuest();

roomNumber.addEventListener('change', onRoomChange);
guestNumber.addEventListener('change', onGuestChange);

const successSendForm = () => {
  showSuccessMessage()
  const message = document.querySelector('.success');

  const onSuccessMessageClick = () => {
    const message = document.querySelector('.success');
    message.remove();
    document.removeEventListener('keydown', onEscKeydown)
  };
  const onEscKeydown = (evt) => {
    if (isEscEvent(evt)) {
      deleteElement(message)
      document.removeEventListener('keydown', onEscKeydown);
    }
  };
  document.addEventListener('keydown', onEscKeydown);
  message.addEventListener('click', onSuccessMessageClick);
};

const errorSendForm = () => {
  showErrorMessage()
  const message = document.querySelector('.error');
  const button = document.querySelector('.error__button');

  const onErrorMessageClick = () => {
    const message = document.querySelector('.error');
    message.remove();
    document.removeEventListener('keydown', onEscKeydown)
  };
  message.addEventListener('click', onErrorMessageClick);

  const onButtonSubmit = () => {
    message.remove();
    document.removeEventListener('keydown', onEscKeydown);
  };
  button.addEventListener('submit', onButtonSubmit) //событие никогда не произойдет, т.к. происходит всегда событие click

  const onEscKeydown = (evt) => {
    if (isEscEvent(evt)) {
      deleteElement(message)
      document.removeEventListener('keydown', onEscKeydown);
    }
  };
  document.addEventListener('keydown', onEscKeydown);
};

const resetForm = () => {
  title.value = '';
  housingType.options[1].selected = true;
  setPriceSettings();
  roomNumber.options[0].selected = true;
  guestNumber.options[2].selected = true;
  description.value = '';
  checkin.options[0].selected = true;
  checkout.options[0].selected = true;
  for (let element of features) {
    element.value = false;
  }
};
resetButton.addEventListener('submut', resetForm)

const onFormSubmit = (evt) => {
  evt.preventDefault();

  sendData(
    () => successSendForm(),
    () => errorSendForm(),
    new FormData(evt.target),
  );
};
form.addEventListener('submit', onFormSubmit);

export {
  changeFormState,
  address
};