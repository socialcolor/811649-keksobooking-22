import {genereteOffer} from './data.js';
import {createOffersMarkup} from './offer.js';
import './form.js';
import {addOfferMap} from './map.js';

const OFFER_COUNT = 10;

const offers = genereteOffer(OFFER_COUNT);
const offerMarkup = createOffersMarkup(offers);
addOfferMap(offers, offerMarkup);
