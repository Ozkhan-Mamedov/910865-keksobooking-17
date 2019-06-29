'use strict';

(function () {
  var URL_GET = ' https://js.dump.academy/keksobooking/data';
  var STATUS_OK = 200;

  /**
   * Функция получения данных с сервера
   * @param {function} onLoad обработчик загрузки
   * @param {function} onError обработчик ошибки
   * @return {Object} объект запроса
   */
  window.load = function (onLoad, onError) {
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
})();
