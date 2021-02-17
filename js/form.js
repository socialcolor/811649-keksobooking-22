import {offerType} from './data.js'

const form = document.querySelector('.ad-form');
const housingType = form.querySelector('#type');
const housingPrice = form.querySelector('#price');
const checkin = form.querySelector('#timein');
const checkout = form.querySelector('#timeout');

const setPriceSettings = () => {
  const price = offerType[housingType.value].price;
  housingPrice.placeholder = price;
  housingPrice.setAttribute('min', price);
};

const onDocumentLoad = () => setPriceSettings();
const onHousingTypeChange = () => setPriceSettings();

document.addEventListener('DOMContentLoaded', onDocumentLoad);
housingType.addEventListener('change', onHousingTypeChange);

const syncTimeValues = (from, to) => to.value = from.value;

const onCheckinChange = () => syncTimeValues(checkin, checkout);
const onCheckoutChange = () => syncTimeValues(checkout, checkin);

checkin.addEventListener('change', onCheckinChange);
checkout.addEventListener('change', onCheckoutChange);
