/* global L:readonly */
import {
  changeFormState,
  address
} from './form.js';
import {
  changeFilterState
} from './filter.js';
import {
  createOffersMarkup
} from './offer.js';

const MAP_LAT = 35.681700;
const MAP_LNG = 139.753882;
const QUANTITY_OFFERS = 10;
const NUMBER_LENGTH = 5;
let markers = [];

const onMapLoad = () => {
  changeFilterState(false);
  changeFormState(false);
  address.value = `${MAP_LAT.toFixed(NUMBER_LENGTH)} ${MAP_LNG.toFixed(NUMBER_LENGTH)}`
};

const map = L.map('map-canvas')
  .on('load', onMapLoad).setView({
    lat: MAP_LAT,
    lng: MAP_LNG,
  }, QUANTITY_OFFERS);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainIcon = L.icon({
  iconUrl: '/img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const offerIcon = L.icon({
  iconUrl: '/img/pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const onMarkerMove = (evt) => address.value = `${evt.target.getLatLng().lat.toFixed(NUMBER_LENGTH)} ${evt.target.getLatLng().lng.toFixed(NUMBER_LENGTH)}`;

const mainMarker = L.marker({
  lat: MAP_LAT,
  lng: MAP_LNG,
}, {
  draggable: true,
  icon: mainIcon,
});

mainMarker.addTo(map).on('moveend', onMarkerMove);

const resetMainMarker = () => {
  mainMarker.setLatLng([MAP_LAT, MAP_LNG]);
  address.value = `${MAP_LAT.toFixed(NUMBER_LENGTH)} ${MAP_LNG.toFixed(NUMBER_LENGTH)}`;
};

const removeMarkers = () => {
  for (let marker of markers) {
    map.removeLayer(marker);
  }
};

const addOffersToMap = (offers) => {
  removeMarkers();
  if (offers.length > QUANTITY_OFFERS) {
    offers = offers.slice(0, QUANTITY_OFFERS);
  }
  markers = [];
  const markup = createOffersMarkup(offers);
  const popups = markup.querySelectorAll('.popup');
  offers.forEach((value, index) => {
    const newMarker = L.marker({
      lat: value.location.lat,
      lng: value.location.lng,
    }, {
      icon: offerIcon,
    });
    markers.push(newMarker);
    newMarker.addTo(map);
    newMarker.bindPopup(popups[index]);
  });
  return markers;
};

export {
  addOffersToMap,
  resetMainMarker,
  removeMarkers
}