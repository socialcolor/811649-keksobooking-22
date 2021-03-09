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
import {
  filter
} from './filter.js';
import {
  resetMainMarker
} from './map.js';


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
const resetButton = form.querySelector('.ad-form__reset');
const LINK_TO_SET = 'https://22.javascript.pages.academy/keksobooking';

const changeFormState = (state) => {
  const formElements = form.querySelectorAll('input, select, textarea, button');
  state ? form.classList.add('ad-form--disabled') : form.classList.remove('ad-form--disabled');
  changeElementState(formElements, state);
};
changeFormState(true);

const resetFilterAndForm = () => {
  form.reset();
  filter.reset();
  setPriceSettings();
  resetMainMarker();
};

const closeSendMessage = (evt, showMessage, element, statefilterAndForm) => {
  showMessage(evt);
  const message = document.querySelector('.' + element);
  const onSuccessMessageClick = () => {
    message.remove();
    document.removeEventListener('keydown', onEscKeydown)
    if (statefilterAndForm) {
      resetFilterAndForm();
    }
  };
  const onEscKeydown = (evt) => {
    if (isEscEvent(evt)) {
      deleteElement(message)
      document.removeEventListener('keydown', onEscKeydown);
    }
  };

  message.addEventListener('click', onSuccessMessageClick);
  document.addEventListener('keydown', onEscKeydown);
};

const successSendForm = (evt) => closeSendMessage(evt, showSuccessMessage, 'success', true);
const errorSendForm = (evt) => closeSendMessage(evt, showErrorMessage, 'error', false);

const onFormSubmit = (evt) => {
  evt.preventDefault();

  sendData(
    LINK_TO_SET,
    () => successSendForm(evt),
    () => errorSendForm(evt),
    new FormData(evt.target),
  );
};

const setPriceSettings = () => {
  const price = offerType[housingType.value].price;
  housingPrice.placeholder = price;
  housingPrice.setAttribute('min', price);
};
setPriceSettings();

const syncTimeValues = (from, to) => to.value = from.value;

const onHousingTypeChange = () => setPriceSettings();
const onCheckinChange = () => syncTimeValues(checkin, checkout);
const onCheckoutChange = () => syncTimeValues(checkout, checkin);
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
};
const validateRoomsAndGuest = () => {
  const rooms = Number(roomNumber.value);
  const geusts = Number(guestNumber.value);
  if (rooms < geusts && geusts !== MIN_ROOM) {
    roomNumber.setCustomValidity(`Для ${rooms} ${rooms == 1 ? 'комнаты' : 'комнат'} слишком много гостей`);
  } else if ((rooms === MAX_ROOM && geusts !== MIN_ROOM) || (geusts === MIN_ROOM && rooms !== MAX_ROOM)) {
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
const onResetButtonClick = (evt) => {
  evt.preventDefault();
  resetFilterAndForm();
};

housingType.addEventListener('change', onHousingTypeChange);
checkin.addEventListener('change', onCheckinChange);
checkout.addEventListener('change', onCheckoutChange);
title.addEventListener('input', onTitileInput);
housingPrice.addEventListener('input', onPriceInput);
resetButton.addEventListener('click', onResetButtonClick);
form.addEventListener('submit', onFormSubmit);

export {
  changeFormState,
  resetButton,
  address
};