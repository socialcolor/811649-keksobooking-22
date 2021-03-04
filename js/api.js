import {
  showMassage
} from './modal.js'

const getData = (onSuccess) => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      showMassage('Данные не загрузились');
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      showMassage('Данные не загрузились');
    })
};

const sendData = (onSuccess, onFail, body) => {
  fetch('https://22.javascript.pages.academy/keksobooking', {
    method: 'POST',
    body,
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
}

export {
  getData,
  sendData
};