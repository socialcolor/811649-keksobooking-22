/* global L:readonly */
import {changeElementState} from './util.js';
import {changeFormState, address} from './form.js';

const MAP_LAT = 35.681700;
const MAP_LNG = 139.753882;

const filter = document.querySelector('.map__filters')
const filterType = filter.querySelector('#housing-type');
const filterPrice = filter.querySelector('#housing-price');
const filterRoom = filter.querySelector('#housing-rooms');
const filterGuest = filter.querySelector('#housing-guests');
const filterfeatures= filter.querySelectorAll('#housing-features input');

const resetFilter = () => {
  filterType.options[0].selected = true;
  filterPrice.options[0].selected = true;
  filterRoom.options[0].selected = true;
  filterGuest.options[0].selected = true;
  for (let input of filterfeatures) {
    input.checked = false;
  }
};
const changeFilterState = (state) => {
  const filterElements = filter.querySelectorAll('select, input');
  if (state) {
    filter.classList.add('map__filters--disabled');
  } else {
    filter.classList.remove('map__filters--disabled');
  }
  changeElementState(filterElements, state);
};

changeFilterState(true);

const onMapLoad = () => {
  changeFilterState(false);
  changeFormState(false);
  address.value = `${MAP_LAT.toFixed(5)} ${MAP_LNG.toFixed(5)}`
};

const map = L.map('map-canvas')
  .on('load', onMapLoad).setView({
    lat: MAP_LAT,
    lng: MAP_LNG,
  }, 10);

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
      lat: value.location.lat,
      lng: value.location.lng,
    }, {
      icon: offerIcon,
    });
    marker.addTo(map);
    marker.bindPopup(popups[index]);
  });
};

export {addOfferMap, resetFilter}
