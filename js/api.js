const getData = (link, onSuccess, onFail) => {
  fetch(link)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      onFail();
    })
    .then((data) => {
      window.data = data;
      onSuccess(data);
    })
    .catch(() => {
      onFail();
    })
};

const sendData = (link, onSuccess, onFail, body) => {
  fetch(link, {
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