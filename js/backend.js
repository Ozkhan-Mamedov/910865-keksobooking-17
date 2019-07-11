'use strict';

(function () {
  var URL_GET = 'https://js.dump.academy/keksobooking/data';
  var URL_POST = 'https://js.dump.academy/keksobooking';
  var STATUS_OK = 200;

  /**
   * Функция получения данных с сервера
   * @param {function} onLoad обработчик загрузки
   * @param {function} onError обработчик ошибки
   * @return {Object} объект запроса
   */
  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.open('GET', URL_GET);
    xhr.send();
    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    return xhr;
  };

  /**
   * Функция отправки данных
   * @param {Object} data
   * @param {function} onSuccess
   * @param {function} onError
   */
  var upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    var form = document.querySelector('.ad-form');

    xhr.responceType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        window.keksobooking.pagesetup.disablePage();
        onSuccess();
        form.reset();
        window.keksobooking.util.closePopup();
        for (var i = 0; i < document.querySelectorAll('.map__filter').length; i++) {
          if (document.querySelectorAll('.map__filter')[i].value !== 'any') {
            document.querySelectorAll('.map__filter')[i].value = 'any';
          }
        }
        for (var j = 0; j < document.querySelectorAll('.map__checkbox').length; j++) {
          document.querySelectorAll('.map__checkbox')[j].checked = false;
        }
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.open('POST', URL_POST);
    xhr.send(data);
  };

  window.keksobooking.backend = {
    load: load,
    upload: upload
  };
})();
