'use strict';

const getRandomNumber = (min, max) => {
  min = Math.floor(min); // если вдруг ввели дробное число, то округляем его первого знака
  max = Math.floor(max); // хотел тут использовать округления в большую сторону, но подумал что это будет некорректно
  if (min < max && (min && max) >= 0) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } else if (min === max) {
    return min;
  } // esLint не дает тут поставить точку с зяпятой
  return 'Error';
};

const getRandomNumberFloat = (min, max, float = 2) => {
  if (min < max && (min && max) >= 0) {
    return +(Math.random() * (max - min) + min).toFixed(float);
  } else if (min === max) {
    return min;
  } // esLint не дает тут поставить точку с зяпятой
  return 'Error';
};

const getNearbyOffers = () => {
  let nearbyOffers = new Array(10).fill({});
  nearbyOffers.forEach((value, index, array) => {
    let titleList = ['Лучшее предложения в Токие', 'Снять номер дешево', 'Скидки до конца недели']; // Список офферов
    let typesList = ['palace', 'flat', 'house', 'bungalow']; // Список типов мест
    let timeList = ['12:00', '13:00', '14:00'] // Список чекина и чекаута
    const getRandimFeatures = () => {
      let featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']; // Список особенностей
      let currentFeatures = []; // Массив особенностей
      let featuresLength = getRandomNumber(1, 6); // Определяем количество особенностей
      for (let i = 0; i < featuresLength; i++) {
        let rundomFeatures = getRandomNumber(0, 5); // Выбираем случайную особенность
        let checkFeatres = currentFeatures.some((value) => value === featuresList[rundomFeatures]); // Проверяем есть ли уже такая особенность
        if (!checkFeatres) {
          currentFeatures.push(featuresList[rundomFeatures]);
        }
      }
      return currentFeatures;
    };

    array[index] = {
      'author': {
        'avatar': 'img/avatars/user' + '0' + getRandomNumber(1, 8) + '.png',
      },
      'offer': {
        'title': titleList[getRandomNumber(0, 2)],
        'adress': getRandomNumberFloat(35.65000, 35.70000, 5) + ', ' + getRandomNumberFloat(139.70000, 139.80000, 5),
        'price': getRandomNumber(1000, 10000),
        'type': typesList[getRandomNumber(0, 3)],
        'rooms': getRandomNumber(1, 5),
        'guests': getRandomNumber(1, 3),
        'checkin': timeList[getRandomNumber(0, 2)],
        'checkout': timeList[getRandomNumber(0, 2)],
        'features': getRandimFeatures(),
        'description': 'Хороший отел с хорошими ценами',
        'photos': ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
      },
      'location': {
        'x': getRandomNumberFloat(35.65000, 35.70000, 5),
        'y': getRandomNumberFloat(139.70000, 139.80000, 5),
      },
    };
  })
  return nearbyOffers;
};

getNearbyOffers();
