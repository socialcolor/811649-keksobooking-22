import {genereteNearbyOffer} from './data.js';
import {createOfferMarkup} from './offer.js';
import './form.js';

const OFFER_COUNT = 10;
const mapCanvas = document.querySelector('#map-canvas');
const nearbyOffers = genereteNearbyOffer(OFFER_COUNT);

const offerMarkup = createOfferMarkup(nearbyOffers[0]);
mapCanvas.appendChild(offerMarkup);
