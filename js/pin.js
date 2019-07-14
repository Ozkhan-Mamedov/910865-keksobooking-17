'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var PIN_NUM = 5;
  var util = window.keksobooking.util;
  var mainPin = window.selectors.mainPin;
  window.isActivated = false;

  /**
   * Создает объект, в котором для каждого пина создается "ключ" - его положение разметке, а значение - индекс
   * @param {HTMLElement} elements
   * @return { {HTMLElement.attributes.style.nodeValue: Number} }
   */
  var generateCoordsToIndexObject = function (elements) {
    var coordsToIndex = {};

    for (var i = 0; i < elements.length; i++) {
      var coords = elements[i].attributes.style.nodeValue;

      coordsToIndex[coords] = i;
    }

    return coordsToIndex;
  };

  /**
   * Обработчик загрузки данных
   * @param { {author: String,
   *           offer: String,
   *           location: Object[]}[] } data
   */
  var onLoad = function (data) {
    window.pins = window.keksobooking.data.createDomElements(data, window.selectors.pinTemplate);
    window.pinsIndex = generateCoordsToIndexObject(window.pins);

    mainPin.addEventListener('mouseup', function () {
      var pinCoordsStyle = mainPin.getAttribute('style');
      var pinCoords = util.getCoords(pinCoordsStyle);

      window.selectors.addressInput.setAttribute('value', util.formatCoords(pinCoords));
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
  };

  /**
   * Обработчик перемещения мыши
   * @param {MouseEvent} moveEvt
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

    if (window.isActivated === false) {
      window.isActivated = true;
      window.keksobooking.pagesetup.enablePage();
      window.keksobooking.data.renderElements(window.pins.slice(0, PIN_NUM));
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

  var onWindowClick = function () {
    document.querySelector('main').removeChild(document.querySelector('.error'));
    document.removeEventListener('click', onWindowClick);
    document.removeEventListener('keydown', onEscPress);
  };

  /**
   * @param {KeyboardEvent} keyEvt
   */
  var onEscPress = function (keyEvt) {
    if (keyEvt.keyCode === ESC_KEYCODE) {
      document.querySelector('main').removeChild(document.querySelector('.error'));
      document.removeEventListener('keydown', onEscPress);
      document.removeEventListener('click', onWindowClick);
    }
  };

  var onError = function () {
    util.generateErrorMessage();
    var errorButton = document.querySelector('.error__button');
    errorButton.addEventListener('click', onWindowClick);
    document.addEventListener('keydown', onEscPress);
    document.addEventListener('click', onWindowClick);
  };

  var serverData = window.keksobooking.backend.load(onLoad, onError);

  window.keksobooking.pin = {
    serverData: serverData,
    onError: onError
  };
})();
