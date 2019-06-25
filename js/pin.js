'use strict';

(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;

  var mainPin = document.querySelector('.map__pin--main');
  window.addressInput = document.getElementById('address');
  var data = window.generateAdObjects();
  var template = document.querySelector('#pin').content.querySelector('.map__pin');

  var pins = window.createDomElements(data, template);
  mainPin.addEventListener('mouseup', function () {
    var pinCoordsStyle = mainPin.getAttribute('style');
    var pinCoords = window.util.getCoords(pinCoordsStyle);
    window.addressInput.setAttribute('value', pinCoords);
  });

  mainPin.addEventListener('mousedown', function (evt) {
    if (document.querySelector('.map').classList.contains('map--faded')) {
      window.enablePage();
      window.renderElements(pins);
    }

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    /**
     * Обработчик перемещения мыши
     * @param {MouseEvent} moveEvt объект события перемещения мыши
     */
    var onMouseMove = function (moveEvt) {
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';

      if (mainPin.offsetLeft < window.util.MIN_NUMBER_X - MAIN_PIN_WIDTH / 2) {
        mainPin.style.left = window.util.MIN_NUMBER_X - MAIN_PIN_WIDTH / 2 + 'px';
      }
      if (mainPin.offsetLeft > window.util.MAX_NUMBER_X - MAIN_PIN_WIDTH / 2) {
        mainPin.style.left = window.util.MAX_NUMBER_X - MAIN_PIN_WIDTH / 2 + 'px';
      }
      if (mainPin.offsetTop < window.util.MIN_NUMBER_Y - MAIN_PIN_HEIGHT) {
        mainPin.style.top = window.util.MIN_NUMBER_Y - MAIN_PIN_HEIGHT + 'px';
      }
      if (mainPin.offsetTop > window.util.MAX_NUMBER_Y) {
        mainPin.style.top = window.util.MAX_NUMBER_Y + 'px';
      }
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
})();
