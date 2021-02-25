import {offerType} from './data.js';
import {changeElementState} from './util.js';

const form = document.querySelector('.ad-form');
const housingType = form.querySelector('#type');
const housingPrice = form.querySelector('#price');
const checkin = form.querySelector('#timein');
const checkout = form.querySelector('#timeout');
const address = form.querySelector('#address');
const title = form.querySelector('#title');
const roomNumber = form.querySelector('#room_number');
const guestNumber = form.querySelector('#capacity');

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

const onTitileValidation = () => {
  if (title.validity.tooShort) {
    title.setCustomValidity(`Ещё ${title.minLength -title.value.length} симв.`);
  } else if (title.validity.tooLong) {
    title.setCustomValidity(`Максимальная длина превышена на ${title.maxLenght - title.nodeValue.length} симв.`);
  } else {
    title.setCustomValidity('');
  }
  title.reportValidity();
};

title.addEventListener('input', onTitileValidation);

const onPriceValidation = () => {
  if (+housingPrice.value < +housingPrice.min) {
    housingPrice.setCustomValidity(`Минимальная цена ${housingPrice.min}`);
  } else if (+housingPrice.value > +housingPrice.max) {
    housingPrice.setCustomValidity(`Максимальная цена ${housingPrice.max}`);
  } else {
    housingPrice.setCustomValidity('');
  }
  housingPrice.reportValidity();
}

housingPrice.addEventListener('input', onPriceValidation);

const onRoomValidation = () => {
  if (+roomNumber.value == 1 && +guestNumber.value > 1) {
    roomNumber.setCustomValidity('Комната расчитана на 1 гостя');
  } else if (+roomNumber.value == 2 && +guestNumber.value > 2) {
    roomNumber.setCustomValidity('Комната расчитана максимум на 2 человека');
  } else if (+roomNumber.value == 3 && +guestNumber.value > 3) {
    roomNumber.setCustomValidity('Комната расчитана максимум на 3 человека');
  } else if (+roomNumber.value == 100 && +guestNumber.value != 0) {
    roomNumber.setCustomValidity('Не для гостей');
  } else {
    roomNumber.setCustomValidity('');
  }
  roomNumber.reportValidity();
}

const onGuestValidation = () => {
  if (+guestNumber.value == 2 && +roomNumber.value < 2) {
    guestNumber.setCustomValidity('Нужно минимум 2 комнаты');
  } else if (+guestNumber.value == 3 && +roomNumber.value < 3) {
    guestNumber.setCustomValidity('Нужно 3 комнаты');
  } else if (+guestNumber.value != 0 && +roomNumber.value == 100) {
    guestNumber.setCustomValidity('Нужно 100 комнат');
  } else {
    guestNumber.setCustomValidity('');
  }
  guestNumber.reportValidity();
}

roomNumber.addEventListener('change', onRoomValidation);
guestNumber.addEventListener('change', onGuestValidation);


export {changeFormState, address};