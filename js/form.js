import {offerType} from './data.js';
import {changeElementState} from './util.js';

const MAX_ROOM = 100;
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
  if (+housingPrice.value < +housingPrice.min) {
    housingPrice.setCustomValidity(`Минимальная цена ${housingPrice.min}`);
  } else if (+housingPrice.value > +housingPrice.max) {
    housingPrice.setCustomValidity(`Максимальная цена ${housingPrice.max}`);
  } else {
    housingPrice.setCustomValidity('');
  }
  housingPrice.reportValidity();
}

housingPrice.addEventListener('input', onPriceInput);

const validateRoomsAndGuest = () => {
  const rooms = Number(roomNumber.value);
  const geusts = Number(guestNumber.value);
  if (rooms < geusts && rooms != 0) {
    roomNumber.setCustomValidity(`Для ${rooms} ${rooms == 1 ? 'комнаты' : 'комнат'} слишком много гостей`);
  } else if (geusts != MAX_ROOM) {
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


export {changeFormState, address};