'use strict';

(function () {
  var isActivated = false;
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  window.PIN_NUM = 5;
  var util = window.util;
  window.template = document.querySelector('#pin').content.querySelector('.map__pin');
  var mainPin = document.querySelector('.map__pin--main');
  window.addressInput = document.querySelector('#address');

  /**
   * Обработчик загрузки данных
   * @param { {author: string,
   *           offer: string,
   *           location: Object[]}[] } data
   */
  var onLoad = function (data) {
    window.pins = window.createDomElements(data, window.template);

    mainPin.addEventListener('mouseup', function () {
      var pinCoordsStyle = mainPin.getAttribute('style');
      var pinCoords = util.getCoords(pinCoordsStyle);
      window.addressInput.setAttribute('value', pinCoords);
    });
    mainPin.addEventListener('mousedown', function (evt) {
      window.startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      /**
       * Обработчик события при отпускании кнопки мыши
       */
      var onMouseUp = function () {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });

    window.offer = window.serverData.response[0].offer;
  };

  /**
   * Обработчик перемещения мыши
   * @param {MouseEvent} moveEvt объект события перемещения мыши
   */
  var onMouseMove = function (moveEvt) {
    var shift = {
      x: window.startCoords.x - moveEvt.clientX,
      y: window.startCoords.y - moveEvt.clientY
    };

    window.startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    if (isActivated === false) {
      isActivated = true;
      window.enablePage();
      window.renderElements(window.pins.slice(0, window.PIN_NUM));
    }

    mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
    mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';

    if (mainPin.offsetLeft < util.MIN_NUMBER_X - MAIN_PIN_WIDTH / 2) {
      mainPin.style.left = util.MIN_NUMBER_X - MAIN_PIN_WIDTH / 2 + 'px';
    }
    if (mainPin.offsetLeft > util.MAX_NUMBER_X - MAIN_PIN_WIDTH / 2) {
      mainPin.style.left = util.MAX_NUMBER_X - MAIN_PIN_WIDTH / 2 + 'px';
    }
    if (mainPin.offsetTop < util.MIN_NUMBER_Y - MAIN_PIN_HEIGHT) {
      mainPin.style.top = util.MIN_NUMBER_Y - MAIN_PIN_HEIGHT + 'px';
    }
    if (mainPin.offsetTop > util.MAX_NUMBER_Y) {
      mainPin.style.top = util.MAX_NUMBER_Y + 'px';
    }
  };

  /**
   * Обработчик ошибки
   */
  var onError = function () {
    util.generateErrorMessage();
  };

  window.serverData = window.load(onLoad, onError);
})();
