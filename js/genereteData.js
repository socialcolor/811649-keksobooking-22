const mapCanvas = document.querySelector('#map__canvas');
const templateCard = document.querySelector('#card').content;
const templateTitle = templateCard.querySelector('.popup__title');
const templateAdress = templateCard.querySelector('.popup__text--address');
const templatePrice = templateCard.querySelector('.popup__text--price');
const templateType = templateCard.querySelector('.popup__type');
const templateCapacity = templateCard.querySelector('.popup__text--capacity');
const templateTime = templateCard.querySelector('.popup__text--time');
const templateFeatures = templateCard.querySelector('.popup__features');
const templateDescription = templateCard.querySelector('.popup__description');
const templatePhotos = templateCard.querySelector('.popup__photos');
const offerTypesValue = {
  flat:'Квартира',
  bungalow:'Бунгало',
  house:'Дом',
  palace:'Дворец',
};