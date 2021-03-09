import {
  changeElementState
} from './util.js';
import {
  offersToMap
} from './map.js';

const filter = document.querySelector('.map__filters');
const type = filter.querySelector('#housing-type');
const price = filter.querySelector('#housing-price');
const room = filter.querySelector('#housing-rooms');
const guest = filter.querySelector('#housing-guests');
const features = filter.querySelectorAll('#housing-features input');

const changeFilterState = (state) => {
  const filterElements = filter.querySelectorAll('select, input');
  if (state) {
    filter.classList.add('map__filters--disabled');
  } else {
    filter.classList.remove('map__filters--disabled');
  }
  changeElementState(filterElements, state);
};

changeFilterState(true);

const changeFilter = (compare) => {
  let markers = [];
  const type = compare.value;
  window.data.forEach((element) => {
    if (element.offer.type === type) {
      markers.push(element)
    }
  });
  return markers;
};

const onFilterChange = () => {
  const houseType = changeFilter(type);
  if(houseType.length === 0) {
    offersToMap(window.data);
  } else {
    offersToMap(houseType);
  }
};

filter.addEventListener('change', onFilterChange);

export {
  filter,
  changeFilterState
}