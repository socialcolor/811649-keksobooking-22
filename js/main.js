import {
  offersToMap
} from './map.js';
import './filter.js'
import './form.js';
import {
  getData
} from './api.js';
import {
  showMassage
} from './modal.js';

const LINK_TO_GET = 'https://22.javascript.pages.academy/keksobooking/data';
const failGetData = () => showMassage('Данные не загрузились');
getData(LINK_TO_GET, offersToMap, failGetData);