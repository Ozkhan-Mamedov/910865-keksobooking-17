'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var MIN_NUMBER_X = 0;
  var MAX_NUMBER_Y = 630;
  var MIN_NUMBER_Y = 130;
  var mapPins = document.querySelector('.map__pins');
  var MAX_NUMBER_X = mapPins.clientWidth;

  /**
   * Функция копирования элементов из псевдомассива в массив
   * @param {NodeListOf<Element>} arr
   * @return {Element[]}
   */
  var copyElements = function (arr) {
    var elements = [];

    for (var i = 0; i < arr.length; i++) {
      elements[i] = arr[i];
    }

    return elements;
  };

  /**
   * @param {String[]} data
   * @return { {x: Number,
   *            y: Number} }
   */
  var extractNumber = function (data) {
    return {
      x: parseFloat(data[0].substr(6)),
      y: parseFloat(data[1].substr(6))
    };
  };

  /**
   * @param { {x: Number,
   *           y: Number} } coords
   * @return {String}
   */
  var formatCoords = function (coords) {
    return coords.x + ', ' + coords.y;
  };

  /**
   * @param {String} expression строка вида ('* ; *')
   * @return { {x: Number,
   *            y: Number} }
   */
  var getCoords = function (expression) {
    var coords = expression.split(';');

    return extractNumber(coords);
  };

  var generateErrorMessage = function () {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorBlock = errorTemplate.cloneNode(true);
    var mainBlock = document.querySelector('main');

    mainBlock.appendChild(errorBlock);
  };

  /**
   * @param {MouseEvent} evt
   */
  var updateClickCoords = function (evt) {
    window.keksobooking.util.x = evt.target.offsetParent.offsetLeft + PIN_WIDTH / 2;
    window.keksobooking.util.y = evt.target.offsetParent.offsetTop + PIN_HEIGHT;
  };

  /**
   * @param {KeyboardEvent} evt
   */
  var updateKeydownCoords = function (evt) {
    window.keksobooking.util.x = evt.target.offsetLeft + PIN_WIDTH / 2;
    window.keksobooking.util.y = evt.target.offsetTop + PIN_HEIGHT;
  };

  var closePopup = function () {
    if (mapPins.contains(document.querySelector('.popup'))) {
      mapPins.removeChild(document.querySelector('.popup'));
    }
  };

  window.keksobooking.util = {
    MIN_NUMBER_X: MIN_NUMBER_X,
    MIN_NUMBER_Y: MIN_NUMBER_Y,
    MAX_NUMBER_X: MAX_NUMBER_X,
    MAX_NUMBER_Y: MAX_NUMBER_Y,
    copyElements: copyElements,
    formatCoords: formatCoords,
    getCoords: getCoords,
    generateErrorMessage: generateErrorMessage,
    updateClickCoords: updateClickCoords,
    closePopup: closePopup,
    updateKeydownCoords: updateKeydownCoords
  };
})();
