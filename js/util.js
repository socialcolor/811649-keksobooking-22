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
    let randomElement = getRandomNumber(0, array.length - 1);
    let checkRepeat = newArray.some((element) => element === array[randomElement]);
    if (!checkRepeat) {
      newArray.push(array[randomElement]);
    }
  }
  return newArray;
};

const changeElementState = (elements, state) => {
  Array.from(elements);
  elements.forEach((value) => {
    value.disabled = state;
  });
};

const deleteElement = (element) => {
  element.remove();
}

const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

const removeHandler = (element, act, handler) => {
  element.removeEventListener(act, handler);
}

function debounce(callback, delay = 500) {
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      timeoutId = null;
      callback(...args);
    }, delay);
  }
}

export {
  getRandomNumber,
  getRandomNumberFloat,
  getRandomElement,
  changeElementState,
  deleteElement,
  isEscEvent,
  removeHandler,
  debounce
};