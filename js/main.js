'use strict';
const OFFER_TITLES = ['Лучшее предложения в Токие', 'Снять номер дешево', 'Скидки до конца недели'];
const OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const OFFER_TYPES = ['palace', 'flat', 'house', 'bungalow'];
const OFFER_TIMES = ['12:00', '13:00', '14:00'];
const OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const OFFER_COUNT = 10;
const USER_AVATARS = 8;
const LOCATION_X_MIN = 35.65000;
const LOCATION_X_MAX = 35.70000;
const LOCATION_Y_MIN = 139.70000;
const LOCATION_Y_MAX = 139.80000;
const LOCATION_FLOAT = 5;
const PRICE_MIN = 1000;
const PRICE_MAX = 10000;
const ROOM_MAX = 5;
const GUEST_MAX = 5;

const getRandomNumber = (min, max) => {
  min = Math.floor(min);
  max = Math.floor(max);
  if (min < max && (min && max) >= 0) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } else if (min === max) {
    return min;
  }
  return 'Error';
}

const getRandomNumberFloat = (min, max, float = 2) => {
  if (min < max && (min && max) >= 0) {
    return +(Math.random() * (max - min) + min).toFixed(float);
  } else if (min === max) {
    return min;
  }
  return 'Error';
}

const getRandomElement = (array) => {
  let newArray = [];
  let newArrayLength = getRandomNumber(1, array.length);
  for (let i = 0; i < newArrayLength; i++) {
    let rundomElement = getRandomNumber(0, array.length - 1);
    let checkRepeat = newArray.some((element) => element === array[rundomElement]);
    if (!checkRepeat) {
      newArray.push(array[rundomElement]);
    }
  }
  return newArray;
};

const getNearbyOffers = () => {
  let locationX = getRandomNumberFloat(LOCATION_X_MIN, LOCATION_X_MAX, LOCATION_FLOAT);
  let locationY = getRandomNumberFloat(LOCATION_Y_MIN, LOCATION_Y_MAX, LOCATION_FLOAT);
  return new Array(OFFER_COUNT).fill().map(() => {
    return {
      'author': {
        'avatar': `img/avatars/user0${getRandomNumber(1, USER_AVATARS)}.png`,
      },
      'offer': {
        'title': OFFER_TITLES[getRandomNumber(0, OFFER_TITLES.length - 1)],
        'adress': `${locationX}, ${locationY}`,
        'price': getRandomNumber(PRICE_MIN, PRICE_MAX),
        'type': OFFER_TYPES[getRandomNumber(0, OFFER_TYPES.length - 1)],
        'rooms': getRandomNumber(1, ROOM_MAX),
        'guests': getRandomNumber(1, GUEST_MAX),
        'checkin': OFFER_TIMES[getRandomNumber(0, OFFER_TIMES.length - 1)],
        'checkout': OFFER_TIMES[getRandomNumber(0, OFFER_TIMES.length - 1)],
        'features': getRandomElement(OFFER_FEATURES),
        'description': 'Хороший отел с хорошими ценами',
        'photos':  getRandomElement(OFFER_PHOTOS),
      },
      'location': {
        'x': locationX,
        'y': locationY,
      },
    };
  })
}


/*
Вариант с объявлением массива вне функции

  const getNearbyOffers = () => {
  let locationX = getRandomNumberFloat(LOCATION_X_MIN, LOCATION_X_MAX, LOCATION_FLOAT);
  let locationY = getRandomNumberFloat(LOCATION_Y_MIN, LOCATION_Y_MAX, LOCATION_FLOAT);
  return {
    'author': {
      'avatar': `img/avatars/user0${getRandomNumber(1, USER_AVATARS)}.png`,
    },
    'offer': {
      'title': OFFER_TITLES[getRandomNumber(0, OFFER_TITLES.length - 1)],
      'adress': `${locationX}, ${locationY}`,
      'price': getRandomNumber(PRICE_MIN, PRICE_MAX),
      'type': OFFER_TYPES[getRandomNumber(0, OFFER_TYPES.length - 1)],
      'rooms': getRandomNumber(1, ROOM_MAX),
      'guests': getRandomNumber(1, GUEST_MAX),
      'checkin': OFFER_TIMES[getRandomNumber(0, OFFER_TIMES.length - 1)],
      'checkout': OFFER_TIMES[getRandomNumber(0, OFFER_TIMES.length - 1)],
      'features': getRandomElement(OFFER_FEATURES),
      'description': 'Хороший отел с хорошими ценами',
      'photos': getRandomElement(OFFER_PHOTOS),
    },
    'location': {
      'x': locationX,
      'y': locationY,
    },
  };
}

const nearbyOffers = new Array(OFFER_COUNT).fill(null).map(() => getNearbyOffers());
 */
