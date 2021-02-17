const form = document.querySelector('.ad-form');
const onTypeOfHousingChange = form.querySelector('#type');
const typeOfHousingPrice = form.querySelector('#price');
const typesOfHousing = {
  'bungalow': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000,
};
const onTimeChange = form.querySelector('.ad-form__element--time');
const checkin = form.querySelector('#timein');
const checkout = form.querySelector('#timeout');

onTypeOfHousingChange.addEventListener('change', () => {
  typeOfHousingPrice.placeholder = typesOfHousing[onTypeOfHousingChange.value];
});

onTimeChange.addEventListener('change', (evt) => {
  const index = evt.target.selectedIndex;
  checkin.options[index].set
  checkin.options[index].selected = true;
  checkout.options[index].selected = true;
});
