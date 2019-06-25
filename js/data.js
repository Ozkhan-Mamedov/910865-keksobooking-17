'use strict';

(function () {
  /**
   * Функция генерирования массива объектов, описывающих объявления
   * @return { {author: string,
   *           offer: string,
   *           location: Object[]}[] } objects результат генерации - массив объектов
   */
  window.generateAdObjects = function () {
    var objects = [];
    var livings = ['palace', 'flat', 'house', 'bungalo'];
    var images = ['img/avatars/user01', 'img/avatars/user02', 'img/avatars/user03', 'img/avatars/user04', 'img/avatars/user05', 'img/avatars/user06', 'img/avatars/user07', 'img/avatars/user08'];

    for (var i = 0; i < 8; i++) {
      objects[i] = {
        'author': {
          avatar: images[i] + '.png'
        },
        'offer': {
          type: livings[window.util.getRandomNumber(0, livings.length - 1)]
        },
        'location': {
          x: window.util.getRandomNumber(window.util.MIN_NUMBER_X, window.util.MAX_NUMBER_X),
          y: window.util.getRandomNumber(window.util.MIN_NUMBER_Y, window.util.MAX_NUMBER_Y)
        }
      };
    }

    return objects;
  };

  /**
   * Функция создания DOM-элементов
   * @param { {author: string,
   *           offer: string,
   *           location: Object[]}[] } objects массив объектов
   * @param {Element} template шаблон элемента
   * @return {HTMLElement[]} массив DOM-элементов
   */
  window.createDomElements = function (objects, template) {
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
   * @param {HTMLElement[]} elements массив DOM-элементов
   */
  window.renderElements = function (elements) {
    var mapPins = document.querySelector('.map__pins');
    var nodes = document.createDocumentFragment();

    for (var i = 0; i < elements.length; i++) {
      nodes.appendChild(elements[i]);
    }

    mapPins.appendChild(nodes);
  };
})();
