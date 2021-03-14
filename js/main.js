import {
  offersAddToMap
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
  onChagneFilter
} from './filter.js';

const LINK_TO_GET = 'https://22.javascript.pages.academy/keksobooking/data';
const failGetData = () => showMassage('Данные не загрузились');
const onDataSuccess = (data) => {
  offersAddToMap(data);
  setFilterListener(() => onChagneFilter(data));
}

getData(LINK_TO_GET, onDataSuccess, failGetData);