import {
  createOffersMarkup
} from './offer.js';
import './filter.js'
import {
  offersToMap
} from './map.js';
import './form.js';
import {
  getData
} from './api.js';
import {showMassage} from './modal.js';

const linkToGet = 'https://22.javascript.pages.academy/keksobooking/data';

const renderMarker = (data) => {
  const markups = createOffersMarkup(data);
  offersToMap(data, markups);
};

const failGetData = () => showMassage('Данные не загрузились');

getData(linkToGet, renderMarker, failGetData);
