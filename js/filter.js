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
    case 'any':
      return data;
    case 'low':
      return data.offer.price < PRICE_RANGE.low.max;
    case 'middle':
      return data.offer.price >=  PRICE_RANGE.middle.min && data.offer.price <=  PRICE_RANGE.middle.max;
    case 'high':
      return data.offer.price >=  PRICE_RANGE.high.min;
  }
};

const checkedFeatures = () => {
  const checkedfeatures = [];
  features.forEach((element) => {
    if (element.checked) {
      checkedfeatures.push(element.value)
    }
  });
  return checkedfeatures;
};

const compareFeatures = (element, features) => {
  const checkedFeatures = features;
  let counter = 0;
  if (checkedFeatures.length !== 0) {
    element.offer.features.forEach((element, index, array) => {
      if (array.includes(checkedFeatures[counter])) {
        counter++
      }
    });
    if (counter === element.offer.features.length) {
      return true
    } else {
      return false
    }
  } else if(checkedFeatures.length === 0) {
    return true;
  }
};

const onChagneFilter = (data) => {
  const filtred = [];
  const type = house.value;
  const rooms = room.value;
  const guests = guest.value;
  const features = checkedFeatures();
  data.forEach(element => {
    const filteredByType = type === 'any' || element.offer.type === type;
    const filteredByRooms = rooms === 'any' || element.offer.rooms === +rooms;
    const filteredByGuests = guests === 'any' || element.offer.guests === +guests;
    if (filteredByType && filteredByRooms && filteredByGuests && filterOfferByPrice(element) && compareFeatures(element, features)) {
      filtred.push(element)
    }
  });
  offersAddToMap(filtred)
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