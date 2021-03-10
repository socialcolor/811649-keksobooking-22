import {
  changeElementState
} from './util.js';
import {
  offersAddToMap
} from './map.js';

const filterMap = document.querySelector('.map__filters');
const filterElements = filterMap.querySelectorAll('select, input');
const house = filterMap.querySelector('#housing-type');
const price = filterMap.querySelector('#housing-price');
const room = filterMap.querySelector('#housing-rooms');
const guest = filterMap.querySelector('#housing-guests');
const features = filterMap.querySelectorAll('#housing-features input');
const DEFAULT_HOUSE_TYPE = 'any';
const PRICE_RANGE = {
  middle: {
    min: 10000,
    max: 50000,
  },
  low: {
    max: 10000,
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

const filterOffersByType = (data) => {
  if (house.value === DEFAULT_HOUSE_TYPE) {
    return data
  }
  return data.filter((item) => (item.offer.type === house.value));
};

const filterOffersByPrice = (data) => {
  switch (price.value) {
    case 'any':
      return data
    case 'middle':
      return data.filter((item) => item.offer.price >= PRICE_RANGE.middle.min && item.offer.price <= PRICE_RANGE.middle.max)
    case 'low':
      return data.filter((item) => item.offer.price <= PRICE_RANGE.low.max)
    case 'high':
      return data.filter((item) => item.offer.price >= PRICE_RANGE.high.min)
  }
};

const filterOffersByRooms = (data) => {
  if (room.value === 'any') {
    return data
  }
  return data.filter((item) => item.offer.rooms === Number(room.value))
};

const filterOffersByGuests = (data) => {
  if (guest.value === 'any') {
    return data
  }
  return data.filter((item) => item.offer.guests === Number(guest.value))
};

const onChagneFilter = (data) => {
  const offersByType = filterOffersByType(data);
  const offersByPrice = filterOffersByPrice(offersByType);
  const offerByRooms = filterOffersByRooms(offersByPrice);
  const offerByGuests = filterOffersByGuests(offerByRooms);
  offersAddToMap(offerByGuests);
};
const setFilterListener = (cb) => {
  filterMap.addEventListener('change', cb);
};

export {
  filterMap,
  changeFilterState,
  setFilterListener,
  onChagneFilter
}