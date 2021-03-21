import {
  addOffersToMap
} from './map.js';
import './form.js';
import {
  getData
} from './api.js';
import {
  showMassage
} from './modal.js';
import {
  setFilterListener,
  onFilterChange
} from './filter.js';
import {
  debounce
} from './util.js';
import './preview.js';

const LINK_TO_GET = 'https://22.javascript.pages.academy/keksobooking/data';
const failGetData = () => showMassage('Данные не загрузились');
const onDataSuccess = (data) => {
  addOffersToMap(data);
  setFilterListener(debounce(() => onFilterChange(data)));
}

getData(LINK_TO_GET, onDataSuccess, failGetData);