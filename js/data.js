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
