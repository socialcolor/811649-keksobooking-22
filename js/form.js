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

const onRoomChange = () => roomNumber.value == '100' ? guestNumber.value = '0' : guestNumber.value = roomNumber.value;
const onGuestChange = () => guestNumber.value == '0' ? roomNumber.value = '100' : roomNumber.value = guestNumber.value;

const setPriceSettings = () => {
  const price = offerType[housingType.value].price;
  housingPrice.placeholder = price;
  housingPrice.setAttribute('min', price);
};

const onDocumentLoad = () => {
  setPriceSettings()
  onRoomChange();
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

roomNumber.addEventListener('change', onRoomChange);
guestNumber.addEventListener('change', onGuestChange);

export {changeFormState, address};