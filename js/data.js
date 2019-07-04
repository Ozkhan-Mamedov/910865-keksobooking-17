'use strict';

(function () {
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
    var mapPins = document.querySelector('.map__pins');

    for (var i = 0; i < objects.length; i++) {
      var pinModel = template.cloneNode(true);

      pinModel.querySelector('img').src = objects[i].author.avatar;
      pinModel.style.left = (objects[i].location.x - PIN_WIDTH / 2) + 'px';
      pinModel.style.top = (objects[i].location.y - PIN_HEIGHT) + 'px';
      pinModel.addEventListener('click', function () {
        if (!mapPins.contains(document.querySelector('.map__card'))) {
          window.fillInCardData(window.renderCard());
        }
      });
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
    var nodesFragment = document.createDocumentFragment();

    for (var i = 0; i < elements.length; i++) {
      nodesFragment.appendChild(elements[i]);
    }

    mapPins.appendChild(nodesFragment);
  };

  /**
   * Функция удаляет отрисованные пины
   */
  window.cleanUpMap = function () {
    var mapPins = document.querySelector('.map__pins');
    var oldPins = mapPins.querySelectorAll('.map__pin[type="button"]');

    oldPins.forEach(function (it) {
      mapPins.removeChild(it);
    });
  };
})();
