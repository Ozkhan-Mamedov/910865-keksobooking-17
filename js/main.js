'use strict';

var INITIAL_MAIN_PIN_COORDS = [570, ' ' + 375];
var PRICE_BUNGALO = 0;
var PRICE_FLAT = 1000;
var PRICE_HOUSE = 5000;
var PRICE_PALACE = 10000;
var mainPin = document.querySelector('.map__pin--main');
var mapPins = document.querySelector('.map__pins');
var addressInput = document.getElementById('address');
var fieldsets = document.querySelectorAll('.ad-form__element');
var filters = document.querySelectorAll('.map__filters');

/**
 * Функция генерирования случайного числа
 * @param {number} min
 * @param {number} max
 * @return {number} результат генерации
 */
var getRandomNumber = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

/**
 * Функция генерирования массива объектов, описывающих объявления
 * @return {Object[]} результат генерации - массив объектов
 */
var makeAdObjects = function () {
  var MIN_NUMBER_X = 0;
  var MAX_NUMBER_Y = 630;
  var MIN_NUMBER_Y = 130;
  var MAX_NUMBER_X = document.querySelector('.map__pins').clientWidth;
  var objects = [];
  var livings = ['palace', 'flat', 'house', 'bungalo'];
  var images = ['img/avatars/user01', 'img/avatars/user02', 'img/avatars/user03', 'img/avatars/user04', 'img/avatars/user05', 'img/avatars/user06', 'img/avatars/user07', 'img/avatars/user08'];

  for (var i = 0; i < 8; i++) {
    objects[i] = {
      'author': {
        avatar: images[i] + '.png'
      },
      'offer': {
        type: livings[getRandomNumber(0, livings.length - 1)]
      },
      'location': {
        x: getRandomNumber(MIN_NUMBER_X, MAX_NUMBER_X),
        y: getRandomNumber(MIN_NUMBER_Y, MAX_NUMBER_Y)
      }
    };
  }

  return objects;
};

/**
 * Функция создания DOM-элементов
 * @param {Object[]} objects массив объектов
 * @param {Object} template шаблон элемента
 * @return {Object[]} массив DOM-элементов
 */
var createDomElements = function (objects, template) {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var elements = [];

  for (var i = 0; i < objects.length; i++) {
    var pinModel = template.cloneNode(true);

    pinModel.querySelector('img').src = objects[i].author.avatar;
    pinModel.style.left = (objects[i].location.x - PIN_WIDTH / 2) + 'px';
    pinModel.style.top = (objects[i].location.y - PIN_HEIGHT) + 'px';
    elements[i] = pinModel;
  }

  return elements;
};

/**
 * Функция заполнения блока DOM-элементами
 * @param {Object[]} elements массив DOM-элементов
 * @param {Object} block блок, заполняемый DOM-элементами
 */
var renderElements = function (elements, block) {
  var nodes = document.createDocumentFragment();

  for (var i = 0; i < elements.length; i++) {
    nodes.appendChild(elements[i]);
  }

  block.appendChild(nodes);
};

/**
 * Функция копирования элементов из псевдомассива в массив
 * @param {Object[]} arr псевдомассив
 * @return {Object[]} массив
 */
var copyElements = function (arr) {
  var arrModified = [];
  for (var i = 0; i < arr.length; i++) {
    arrModified[i] = arr[i];
  }

  return arrModified;
};

/**
 * Функция деактивации элементов
 * @param {Object[]} elements массив деактивируемых элементов
 */
var disableElements = function (elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].setAttribute('disabled', 'disabled');
  }
};

/**
 * Функция активации элементов
 * @param {Object[]} elements массив активируемых элементов
 */
var enableElements = function (elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].removeAttribute('disabled');
  }
};

/**
 * Функция деактивации страницы
 */
var disablePage = function () {
  document.querySelector('.map').classList.add('map--faded');
  document.querySelector('.ad-form').classList.add('ad-form--disabled');

  addressInput.setAttribute('value', INITIAL_MAIN_PIN_COORDS);
  disableElements(fieldsetsModified);
  disableElements(filters);
};

/**
 * Функция активации страницы
 */
var enablePage = function () {
  document.querySelector('.map').classList.remove('map--faded');
  document.querySelector('.ad-form').classList.remove('ad-form--disabled');

  enableElements(fieldsetsModified);
  enableElements(filters);
};

/**
 * Функция обработчик события клика по главному пину
 */
var onMainPinClick = function () {
  enablePage();
  renderElements(pins, mapPins);
  mainPin.removeEventListener('click', onMainPinClick);
};

/**
 * Функция извлекает число из строки
 * @param {Object[]} data массив строк с координатами
 * @return {Object[]} обработанный массив
 */
var extractNumber = function (data) {
  var numberX = parseInt(data[0].replace(/\D+/g, ''), 10);
  var numberY = parseInt(data[1].replace(/\D+/g, ''), 10);

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
 * Функция подстановки атрибутов в элемены
 * @param {Number} value значение атрибутов
 */
var setPriceAttributes = function (value) {
  priceInput.setAttribute('min', value);
  priceInput.setAttribute('placeholder', value);
};

/**
 * Функция сихронизации времени
 * @param {Object} dateInput время относительно которого синхронизируемся
 * @param {Object} targetDateInput синхронизируемое время
 */
var synchronizeDateInput = function (dateInput, targetDateInput) {
  var currentValue = dateInput.value;
  targetDateInput.value = currentValue;
};

var fieldsetsModified = copyElements(fieldsets);
fieldsetsModified.push(document.querySelector('.ad-form-header'));

disablePage();

var data = makeAdObjects();
var template = document.querySelector('#pin').content.querySelector('.map__pin');
var pins = createDomElements(data, template);

mainPin.addEventListener('click', onMainPinClick);
mainPin.addEventListener('mouseup', function () {
  var pinCoordsStyle = mainPin.getAttribute('style');
  var pinCoords = getCoords(pinCoordsStyle);
  addressInput.setAttribute('value', pinCoords);
});

var livingTypeInput = document.querySelector('select[name=type]');
var priceInput = document.querySelector('input[name=price]');

livingTypeInput.addEventListener('change', function () {

  if (livingTypeInput.value === 'bungalo') {
    setPriceAttributes(PRICE_BUNGALO);
  }
  if (livingTypeInput.value === 'flat') {
    setPriceAttributes(PRICE_FLAT);
  }

  if (livingTypeInput.value === 'house') {
    setPriceAttributes(PRICE_HOUSE);
  }

  if (livingTypeInput.value === 'palace') {
    setPriceAttributes(PRICE_PALACE);
  }

});

var arrivalTimeInput = document.getElementById('timein');
var departureTimeInput = document.getElementById('timeout');

arrivalTimeInput.addEventListener('change', function () {
  synchronizeDateInput(arrivalTimeInput, departureTimeInput);
});
departureTimeInput.addEventListener('change', function () {
  synchronizeDateInput(departureTimeInput, arrivalTimeInput);
});
