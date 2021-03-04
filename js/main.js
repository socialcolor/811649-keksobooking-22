import {
  createOffersMarkup
} from './offer.js';
import './form.js';
import {
  addOfferMap
} from './map.js';
import {
  getData
} from './api.js';

const renderMarker = (data) => {
  const murkup = createOffersMarkup(data);
  addOfferMap(data, murkup);
};

getData(renderMarker);
