import {
  changeElementState
} from './util.js';
import {
  addOffersToMap
} from './map.js';
const EMPTY_VALUE = 'any';
const filterMap = document.querySelector('.map__filters');
const filterElements = filterMap.querySelectorAll('select, input');
const house = filterMap.querySelector('#housing-type');
const price = filterMap.querySelector('#housing-price');
const room = filterMap.querySelector('#housing-rooms');
const guest = filterMap.querySelector('#housing-guests');
const PRICE_RANGE = {
  low: {
    max: 10000,
  },
  middle: {
    min: 10000,
    max: 50000,
  },
  high: {
    min: 50000,
  },
};
const changeFilterState = (state) => {
  if (state) {
    filterMap.classList.add('map__filters--disabled');
  } else {
    filterMap.classList.remove('map__filters--disabled');
  }
  changeElementState(filterElements, state);
};
changeFilterState(true);


const filterOfferByPrice = (data) => {
  switch (price.value) {
    case EMPTY_VALUE:
      return true;
    case 'low':
      return data.offer.price < PRICE_RANGE.low.max;
    case 'middle':
      return data.offer.price >= PRICE_RANGE.middle.min && data.offer.price <= PRICE_RANGE.middle.max;
    case 'high':
      return data.offer.price >= PRICE_RANGE.high.min;
  }
};

const compareFeatures = (element) => {
  const checkedFeatures = Array.from(document.querySelectorAll('input:checked')).map(input => input.value);
  let counter = 0;
  checkedFeatures.forEach((feature) => {
    const status = element.offer.features.includes(feature);
    if (status) {
      counter++
    }
  });
  if (counter === checkedFeatures.length) {
    return true;
  } else {
    return false;
  }
};


const onFilterChange = (data) => {
  const type = house.value;
  const rooms = room.value;
  const guests = guest.value;
  const filtredOffers = data.filter(element => {
    const filteredByType = type === EMPTY_VALUE || element.offer.type === type;
    const filteredByRooms = rooms === EMPTY_VALUE || element.offer.rooms === +rooms;
    const filteredByGuests = guests === EMPTY_VALUE || element.offer.guests === +guests;
    return filteredByType && filteredByRooms && filteredByGuests && filterOfferByPrice(element) && compareFeatures(element)
  });
  addOffersToMap(filtredOffers)
};
const setFilterListener = (cb) => {
  filterMap.addEventListener('change', cb);
};

export {
  filterMap,
  changeFilterState,
  setFilterListener,
  onFilterChange
}