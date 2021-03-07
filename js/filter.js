import {
  changeElementState
} from './util.js';

const filter = document.querySelector('.map__filters');

const changeFilterState = (state) => {
  const filterElements = filter.querySelectorAll('select, input');
  if (state) {
    filter.classList.add('map__filters--disabled');
  } else {
    filter.classList.remove('map__filters--disabled');
  }
  changeElementState(filterElements, state);
};

changeFilterState(true);

export{filter, changeFilterState}