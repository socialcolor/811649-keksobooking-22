'use strict';

const getRandomNumber = function (min, max) {
  min = Math.floor(min); // если вдруг ввели дробное число, то округляем его первого знака
  max = Math.floor(max); // хотел тут использовать округления в большую сторону, но подумал что это будет некорректно
  if (min < max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } else if (min === max) {
    return min;
  } // esLint не дает тут поставить точку с зяпятой
  return 0;
};

const getRandomNumberFloat = function (min, max, float = 2) {
  if (min < max) {
    return +(Math.random() * (max - min) + min).toFixed(float);
  } else if (min === max) {
    return min;
  } // esLint не дает тут поставить точку с зяпятой
  return 0;
};
