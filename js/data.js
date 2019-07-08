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

    getCoordsArr(window.pinscoords);

    return elements;
  };

  /**
   * Преобразует массив объектов с координатами в объект объектов
   * @param { {x: Number, y: Number}[] } coords
   * @return { {x: Number, y: Number} }
   */
  var getCoordsArr = function (coords) {
    var coordsObj = {};

    for (var i = 0; i < coords.length; i++) {
      coordsObj['' + i] = coords[i];
    }

    return coordsObj;
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

        window.keksobooking.card.fillInCardData(window.keksobooking.card.renderCard(), indexReturn(getCoordsArr(window.pinscoords)));
      }
    }
  };

  /**
   * Возвращает индекс элемента по которому производится клик
   * @param { {x: Number, y: Number} } locations
   * @return {Number}
   */
  var indexReturn = function (locations) {
    var index;
    var currentPinsNumber = 0;

    for (var j in locations) {
      if (locations[j].x) {
        currentPinsNumber++;
      }
    }

    for (var i = 0; i < currentPinsNumber; i++) {
      if ((locations[i].x === window.x) && (locations[i].y === window.y)) {
        index = i;
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
    getCoordsArr: getCoordsArr,
    onPinClick: onPinClick,
    indexReturn: indexReturn
  };
})();
