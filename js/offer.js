import {nearbyOffer} from './data.js';

const mapCanvas = document.querySelector('#map-canvas');
const templateCard = document.querySelector('#card').content;
const OfferTypesValue = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
};

const renderOffers = () => {
  const offerFragment = document.createDocumentFragment();

  nearbyOffer.forEach((currentValue) => {
    const offer = templateCard.cloneNode(true);
    offer.querySelector('.popup__title').textContent = currentValue['offer']['title'];
    offer.querySelector('.popup__avatar').setAttribute('src', currentValue['author']['avatar']);
    offer.querySelector('.popup__text--address').textContent = currentValue['offer']['adress'];
    offer.querySelector('.popup__text--price').innerHTML = `${currentValue['offer']['price']} <span>₽/ночь</span>`;
    offer.querySelector('.popup__type').textContent = OfferTypesValue[currentValue['offer']['type']];
    offer.querySelector('.popup__text--capacity').textContent = `${currentValue['offer']['rooms']} комнаты для ${currentValue['offer']['guests']} гостей`;
    offer.querySelector('.popup__text--time').textContent = `Заезд после ${currentValue['offer']['checkin']}, выезд до ${currentValue['offer']['checkout']}`;
    offer.querySelector('.popup__description').textContent = currentValue['offer']['description'];
    offer.querySelector('.popup__features').innerHTML = '';
    offer.querySelector('.popup__photos').innerHTML = '';
    for (let value of currentValue['offer']['features']) {
      offer.querySelector('.popup__features').insertAdjacentHTML('beforeend', `<li class="popup__feature popup__feature--${value}"></li>`)
    }
    for (let value of currentValue['offer']['photos']) {
      offer.querySelector('.popup__photos').insertAdjacentHTML('beforeend', `<img src="${value}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`)
    }

    offerFragment.appendChild(offer);
  });

  mapCanvas.appendChild(offerFragment);
};

export {renderOffers};