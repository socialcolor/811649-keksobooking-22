import {offerType} from './data.js'
const templateCard = document.querySelector('#card').content;

const createOfferMarkup = (offers) => {
  const offerTemplate = templateCard.cloneNode(true);
  const {offer, author} = offers;
  const features = offerTemplate.querySelector('.popup__features');
  const photos = offerTemplate.querySelector('.popup__photos');

  offerTemplate.querySelector('.popup__title').textContent = offer.title;
  offerTemplate.querySelector('.popup__avatar').setAttribute('src', author.avatar);
  offerTemplate.querySelector('.popup__text--address').textContent = offer.adress;
  offerTemplate.querySelector('.popup__text--price').innerHTML = `${offer.price} <span>₽/ночь</span>`;
  offerTemplate.querySelector('.popup__type').textContent = offerType[offer.type]['name'];
  offerTemplate.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  offerTemplate.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  offerTemplate.querySelector('.popup__description').textContent = offer.description;

  features.innerHTML = '';
  photos.innerHTML = '';

  for (let value of offer.features) {
    features.insertAdjacentHTML('beforeend', `<li class="popup__feature popup__feature--${value}"></li>`)
  }
  for (let value of offer.photos) {
    photos.insertAdjacentHTML('beforeend', `<img src="${value}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`)
  }

  return offerTemplate;
};

const createOffersMarkup = (offers) => {
  const offersFragment = document.createDocumentFragment();
  offers.forEach((offer) => {
    const fragment = createOfferMarkup(offer);
    offersFragment.appendChild(fragment);
  });
  return offersFragment;
};

export {createOfferMarkup, createOffersMarkup};
