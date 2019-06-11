/**
 * Функция генерирования случайного числа
 * @param {number} min
 * @param {number} max
 * @return {number} результат генерации
 */
var getRandomNumber = function(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

/**
 * Функция генерирования массива объектов, описывающих объявления
 * @return {Object} результат генерации
 */
var makeList = function() {
  var MAX_NUMBER_X = 1200;
  var MIN_NUMBER_X = 0;
  var MAX_NUMBER_Y = 630;
  var MIN_NUMBER_Y = 130;
  var data = [];
  var livingType = ['palace', 'flat', 'house', 'bungalo'];

  for (var dataIndex = 0; dataIndex < 8; dataIndex++) {
    data[dataIndex] = {
      "author": {
        avatar: 'img/avatars/user0' + String(dataIndex+1) + '.png'
      },
      "offer": {
        type: livingType[getRandomNumber(0, livingType.length-1)]
      },
      "location": {
        x: getRandomNumber(MIN_NUMBER_X, MAX_NUMBER_X),
        y: getRandomNumber(MIN_NUMBER_Y, MAX_NUMBER_Y)
      }
    };
  }
  return data;
};

/**
 * Функция создания DOM-элементов
 * @param {Object} elementList массив объектов
 * @param {Object} template шаблон элемента
 * @return {Object} массив DOM-элементов
 */
var createElement = function(elementList, template) {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var collection = [];

  for (var i = 0; i < elementList.length; i++) {
    var pinModel = template.cloneNode(true);

    pinModel.querySelector('img').src = elementList[i].author.avatar;
    pinModel.style.left = (elementList[i].location.x + PIN_WIDTH/2) + 'px';
    pinModel.style.top = (elementList[i].location.y + PIN_HEIGHT) + 'px';
    collection[i] = pinModel;
  }
  return collection;
};

/**
 * Функция заполнения блока DOM-элементами
 * @param {Object} collectionList массив DOM-элементов
 * @param {Object} block заполняемый блок
 */
var fillBlock = function(collectionList, block) {
  for (var i = 0; i<collectionList.length; i++) {
    block.appendChild(collectionList[i]);
  }
};

var mapPins = document.querySelector('.map__pins');
var template = document.querySelector('#pin').content.querySelector('.map__pin');
var data = makeList();
var pinCollection = createElement(data, template);

fillBlock(pinCollection, mapPins);
