'use strict';

(function () {
  var MIN_NUMBER_X = 0;
  var MAX_NUMBER_Y = 630;
  var MIN_NUMBER_Y = 130;
  var MAX_NUMBER_X = document.querySelector('.map__pins').clientWidth;

  /**
   * Функция копирования элементов из псевдомассива в массив
   * @param {NodeListOf<Element>} arr псевдомассив
   * @return {Element[]} массив
   */
  var copyElements = function (arr) {
    var arrModified = [];

    for (var i = 0; i < arr.length; i++) {
      arrModified[i] = arr[i];
    }

    return arrModified;
  };

  /**
   * Функция генерирования случайного числа
   * @param {Number} min
   * @param {Number} max
   * @return {Number} результат генерации
   */
  var getRandomNumber = function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
  };

  /**
   * Функция извлекает число из строки
   * @param {String[]} data массив строк с координатами
   * @return {Object[]} обработанный массив
   */
  var extractNumber = function (data) {
    var numberX = parseFloat(data[0].substr(6));
    var numberY = parseFloat(data[1].substr(6));

    return [numberX, ' ' + numberY];
  };

  /**
   * Функция получения координат
   * @param {String} expression подаваемая строка
   * @return {Object[]} массив с координатами
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

  window.util = {
    MIN_NUMBER_X: MIN_NUMBER_X,
    MIN_NUMBER_Y: MIN_NUMBER_Y,
    MAX_NUMBER_X: MAX_NUMBER_X,
    MAX_NUMBER_Y: MAX_NUMBER_Y,
    copyElements: copyElements,
    getRandomNumber: getRandomNumber,
    getCoords: getCoords,
    generateErrorMessage: generateErrorMessage
  };
})();
