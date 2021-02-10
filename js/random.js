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

export {getRandomNumber, getRandomNumberFloat, getRandomElement};