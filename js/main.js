'use strict';

const getRandomNumber = function (min, max) {
  if (min < max && (min > 0 && max > 0)) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } else if (min === max) {
    return min;
  } // esLint не дает тут поставить точку с зяпятой
  return 0;
};

const getRandomNumberFloat = function (min, max, float = 2) {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min < max && (min > 0 && max > 0)) {
    return (Math.random() * (max - min + 1) + min).toFixed(float);
  } else if (min === max) {
    return min;
  } // esLint не дает тут поставить точку с зяпятой
  return 0;
};

