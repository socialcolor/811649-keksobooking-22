import {getRandomNumber, getRandomNumberFloat, getRandomElement} from './util.js';

const OFFER_TITLES = ['Лучшее предложения в Токие', 'Снять номер дешево', 'Скидки до конца недели'];
const OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const OFFER_TYPES = ['palace', 'flat', 'house', 'bungalow'];
const OFFER_TIMES = ['12:00', '13:00', '14:00'];
const OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
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
const OFFER_COUNT = 1;

const genereteNearbyOffer = (count) => {
  return new Array(count).fill().map(() => {
    const LOCATION_X = getRandomNumberFloat(LOCATION_X_MIN, LOCATION_X_MAX, LOCATION_FLOAT);
    const LOCATION_Y = getRandomNumberFloat(LOCATION_Y_MIN, LOCATION_Y_MAX, LOCATION_FLOAT);
    return {
      'author': {
        'avatar': `img/avatars/user0${getRandomNumber(1, USER_AVATARS)}.png`,
      },
      'offer': {
        'title': OFFER_TITLES[getRandomNumber(0, OFFER_TITLES.length - 1)],
        'adress': `${LOCATION_X}, ${LOCATION_Y}`,
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
        'x': LOCATION_X,
        'y': LOCATION_Y,
      },
    };
  })
};

const nearbyOffer = genereteNearbyOffer(OFFER_COUNT);

export {nearbyOffer};