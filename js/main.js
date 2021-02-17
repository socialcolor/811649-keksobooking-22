import {genereteNearbyOffer} from './data.js';
import {createOfferMarkup} from './offer.js';

const mapCanvas = document.querySelector('#map-canvas');
const OFFER_COUNT = 10;
const nearbyOffers = genereteNearbyOffer(OFFER_COUNT);

const offerMarkup = createOfferMarkup(nearbyOffers[0]);

mapCanvas.appendChild(offerMarkup);