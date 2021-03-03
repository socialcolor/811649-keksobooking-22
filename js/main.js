import {
  createOffersMarkup
} from './offer.js';
import {
  resetForm,
  resetButton
} from './form.js';
import {
  addOfferMap,
  resetFilter
} from './map.js';
import {
  getData
} from './api.js';

const renderMarker = (data) => {
  const murkup = createOffersMarkup(data);
  addOfferMap(data, murkup);
};

getData(renderMarker);

const onResetButtonClick = (evt) => {
  resetForm(evt);
  resetFilter();
};
resetButton.addEventListener('click', onResetButtonClick)

