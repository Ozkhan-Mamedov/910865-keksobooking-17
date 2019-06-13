'use strict';

/**
 * Функция первоначальной настройки
 */
var setup = function () {
  document.querySelector('.map').classList.remove('map--faded');
};

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


setup();

var mapPins = document.querySelector('.map__pins');
var template = document.querySelector('#pin').content.querySelector('.map__pin');
var data = makeAdObjects();
var pins = createDomElements(data, template);

renderElements(pins, mapPins);
