/* global L:readonly */
import {stateElement} from './util.js';
import {changeFormState, address} from './form.js';

const MAP_LAT = 35.681700;
const MAP_LNG = 139.753882;

const filter = document.querySelector('.map__filters')

const changeFilterState = (toggle) => {
  const filterElements = filter.querySelectorAll('select, input');
  if (toggle) {
    filter.classList.add('map__filters--disabled');
  } else {
    filter.classList.remove('map__filters--disabled');
  }
  stateElement(filterElements, toggle);
};

changeFilterState(true);

const onMapLoad = () => {
  changeFilterState(false);
  changeFormState(false);
  address.value = `${MAP_LAT} ${MAP_LNG}`
};

const map = L.map('map-canvas')
  .on('load', onMapLoad).setView({
    lat: MAP_LAT,
    lng: MAP_LNG,
  }, 13);

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

const onMarkerMove = (evt) => address.value = `${evt.target.getLatLng().lat.toFixed(5)} ${evt.target.getLatLng().lng.toFixed(5)}`;

L.marker({
  lat: MAP_LAT,
  lng: MAP_LNG,
}, {
  draggable: true,
  icon: mainIcon,
}).addTo(map).on('moveend', onMarkerMove);

const addOfferMap = (offers, markup) => {
  const popups = markup.querySelectorAll('.popup');
  offers.forEach((value, index) => {
    const marker = L.marker({
      lat: value.location.x,
      lng: value.location.y,
    }, {
      icon: offerIcon,
    });
    marker.addTo(map);
    marker.bindPopup(popups[index]);
  });
};

export {addOfferMap}
