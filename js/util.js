'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var MIN_NUMBER_X = 0;
  var MAX_NUMBER_Y = 630;
  var MIN_NUMBER_Y = 130;
  var MAX_NUMBER_X = window.selectors.mapPins.clientWidth;

  /**
   * Функция копирования элементов из псевдомассива в массив
   * @param {NodeListOf<Element>} arr
   * @return {Element[]}
   */
  var copyElements = function (arr) {
    var arrModified = [];

    for (var i = 0; i < arr.length; i++) {
      arrModified[i] = arr[i];
    }

    return arrModified;
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
   * Функция получения массива с координатами
   * @param {String} expression строка вида ('* ; *')
   * @return { {x: Number,
   *            y: Number} }
   */
  var getCoords = function (expression) {
    var coords = expression.split(';');

    return extractNumber(coords);
  };

  /**
   * Функция создает блок с сообщением об шибке по шаблону
   */
  var generateErrorMessage = function () {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorBlock = errorTemplate.cloneNode(true);
    var mainBlock = document.querySelector('main');

    mainBlock.appendChild(errorBlock);
  };

  var updateClickCoords = function (evt) {
    window.x = evt.target.offsetParent.offsetLeft + PIN_WIDTH / 2;
    window.y = evt.target.offsetParent.offsetTop + PIN_HEIGHT;
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
    updateClickCoords: updateClickCoords
  };
})();
