import {offerType} from './data.js'

const form = document.querySelector('.ad-form');
const housingType = form.querySelector('#type');
const housingPrice = form.querySelector('#price');
const checkin = form.querySelector('#timein');
const checkout = form.querySelector('#timeout');

const onTypeChange = () => {
  housingPrice.placeholder = offerType[housingType.value]['price'];
  housingPrice.setAttribute('min', offerType[housingType.value]['price']);
};

document.addEventListener('DOMContentLoaded', onTypeChange);
housingType.addEventListener('change', onTypeChange);

const syncTimeValues = (from, to) => to.value = from.value;

const onCheckinChange = () => syncTimeValues(checkin, checkout);
const onCheckoutChange = () => syncTimeValues(checkout, checkin);

checkin.addEventListener('change', onCheckinChange);
checkout.addEventListener('change', onCheckoutChange);
