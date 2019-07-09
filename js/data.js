'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  /**
   * @param { {author: string,
   *           offer: string,
   *           location: Object[]}[] } objects
   * @param {Element} template шаблон элемента
   * @return {HTMLElement[]}
   */
  var createDomElements = function (objects, template) {
    var elements = [];
    window.pinscoords = [];

    for (var i = 0; i < objects.length; i++) {
      var pinModel = template.cloneNode(true);

      pinModel.querySelector('img').src = objects[i].author.avatar;
      pinModel.querySelector('img').alt = objects[i].offer.title;
      pinModel.style.left = (objects[i].location.x - PIN_WIDTH / 2) + 'px';
      pinModel.style.top = (objects[i].location.y - PIN_HEIGHT) + 'px';
      window.pinscoords.push(getLoadedCoordsList(objects[i]));
      elements[i] = pinModel;
    }

    return elements;
  };

  /**
   * @param { {author: string,
   *           offer: string,
   *           location: Object[]} } element
   * @return { {x: Number, y: Number} }
   */
  var getLoadedCoordsList = function (element) {
    return {
      x: element.location.x,
      y: element.location.y
    };
  };

  /**
   * @param {HTMLElement[]} elements
   */
  var renderElements = function (elements) {
    var nodesFragment = document.createDocumentFragment();

    for (var i = 0; i < elements.length; i++) {
      nodesFragment.appendChild(elements[i]);
    }

    window.selectors.mapPins.appendChild(nodesFragment);
    window.selectors.mapPins.addEventListener('click', onPinClick);
  };

  /**
   * @param {MouseEvent} evt
   */
  var onPinClick = function (evt) {
    if ((evt.target.tagName === 'IMG') && (evt.target.height === 40)) {
      if (!window.selectors.mapPins.contains(document.querySelector('.map__card'))) {
        window.x = evt.target.offsetParent.offsetLeft + PIN_WIDTH / 2;
        window.y = evt.target.offsetParent.offsetTop + PIN_HEIGHT;
        var currentPinIndex = returnIndex(window.pinscoords);
        var cardModel = window.keksobooking.card.generateCardModel();

        window.keksobooking.card.fillInCardData(cardModel, currentPinIndex);
      }
    }
  };

  /**
   * Возвращает индекс элемента по которому производится клик
   * @param { {x: Number, y: Number} } locations
   * @return {Number}
   */
  var returnIndex = function (locations) {
    var index;

    for (var i = 0; i < window.pinscoords.length; i++) {
      if ((locations[i].x === window.x) && (locations[i].y === window.y)) {
        index = i;
        break;
      }
    }

    return index;
  };

  var cleanUpMap = function () {
    var oldPins = window.selectors.mapPins.querySelectorAll('.map__pin[type="button"]');

    oldPins.forEach(function (it) {
      window.selectors.mapPins.removeChild(it);
    });
  };

  window.keksobooking.data = {
    cleanUpMap: cleanUpMap,
    renderElements: renderElements,
    createDomElements: createDomElements,
    onPinClick: onPinClick,
    returnIndex: returnIndex
  };
})();
