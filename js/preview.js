const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const AVATAR_DEFAULT_IMG = 'img/muffin-grey.svg';
const inputAvatar = document.querySelector('.ad-form-header__input');
const previewAvatar = document.querySelector('.ad-form-header__preview img');
const inputHousePhoto = document.querySelector('.ad-form__photo-container input');
const previewHousePhoto = document.querySelector('.ad-form__photo img');


const setPreview = (evt, previewImg) => {
  const file = evt.target.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });
  if (matches) {
    const reader = new FileReader();
    const onPreviewImgLoad = () => previewImg.src = reader.result;
    reader.addEventListener('load', onPreviewImgLoad);
    reader.readAsDataURL(file);
  }
  if (previewImg.classList.contains('visually-hidden')) {
    previewImg.classList.remove('visually-hidden');
  }
};

const setDefualtPreview = () => {
  previewAvatar.src = AVATAR_DEFAULT_IMG;
  previewHousePhoto.src = '';
  previewHousePhoto.classList.add('visually-hidden');
};

const onInputAvatarChange = (evt) => setPreview(evt, previewAvatar);
const onInputPhotoChange = (evt) => setPreview(evt, previewHousePhoto);

inputAvatar.addEventListener('change', onInputAvatarChange);
inputHousePhoto.addEventListener('change', onInputPhotoChange);

export {
  setDefualtPreview
};
