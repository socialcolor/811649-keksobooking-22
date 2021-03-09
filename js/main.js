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

const LINK_TO_GET = 'https://22.javascript.pages.academy/keksobooking/data';
const markers = [];
const renderMarker = (data) => {
  const markups = createOffersMarkup(data);
  markers.push(offersToMap(data, markups));
};
console.log(markers);

const failGetData = () => showMassage('Данные не загрузились');
getData(LINK_TO_GET, renderMarker, failGetData);
