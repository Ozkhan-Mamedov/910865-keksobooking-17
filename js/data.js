'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var PIN_IMG_HEIGHT = 40;
  var ENTER_KEYCODE = 13;
  window.initialpinscoords = [];
  window.isRendered = false;

  /**
   * @param { { author: string,
   *            offer: string,
   *            location: Object[] }[] } objects
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
      if (window.isRendered === false) {
        window.initialpinscoords.push(getLoadedCoordsList(objects[i]));
      }
      elements[i] = pinModel;
    }
    window.isRendered = true;

    return elements;
  };

  /**
   * @param { { author: string,
   *            offer: string,
   *            location: Object[] } } element
   * @return { { x: Number, y: Number } }
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
    window.selectors.mapPins.addEventListener('keydown', onPinPress);
  };

  /**
   * @param {KeyboardEvent} keyEvt
   */
  var onPinPress = function (keyEvt) {
    if (keyEvt.keyCode === ENTER_KEYCODE) {
      if (keyEvt.target.clientHeight === PIN_HEIGHT) {
        if (!window.selectors.mapPins.contains(document.querySelector('.map__card'))) {
          window.keksobooking.util.updateKeydownCoords(keyEvt);
          window.currentPinIndex = returnIndex(window.pinscoords);
          setActiveClass(window.currentPinIndex);
          var cardModel = window.keksobooking.card.generateCardModel();

          window.keksobooking.card.fillInCardData(cardModel, window.keksobooking.pin.serverData.response[window.currentPinIndex]);
        } else {
          window.keksobooking.util.updateKeydownCoords(keyEvt);
          removeActiveClass();
          window.currentPinIndex = returnIndex(window.pinscoords);
          var newPinIndex = returnIndex(window.pinscoords);
          setActiveClass(newPinIndex);
          var newCardModel = window.keksobooking.card.generateCardModel();

          window.selectors.mapPins.removeChild(document.querySelector('.popup'));
          window.keksobooking.card.fillInCardData(newCardModel, window.keksobooking.pin.serverData.response[newPinIndex]);
        }
      }
    }
  };

  /**
   * @param {MouseEvent} evt
   */
  var onPinClick = function (evt) {
    if (((evt.target.tagName === 'IMG') && (evt.target.height === PIN_IMG_HEIGHT)) || ((evt.target.tagName === 'BUTTON') && (evt.target.clientHeight === PIN_HEIGHT))) {
      if (!window.selectors.mapPins.contains(document.querySelector('.map__card'))) {
        if (evt.target.tagName === 'IMG') {
          window.keksobooking.util.updateClickCoords(evt);
        }
        if (evt.target.tagName === 'BUTTON') {
          window.keksobooking.util.updateKeydownCoords(evt);
        }
        window.currentPinIndex = returnIndex(window.pinscoords);
        setActiveClass(window.currentPinIndex);
        var cardModel = window.keksobooking.card.generateCardModel();

        window.keksobooking.card.fillInCardData(cardModel, window.keksobooking.pin.serverData.response[window.currentPinIndex]);
      } else {
        if (evt.target.tagName === 'IMG') {
          window.keksobooking.util.updateClickCoords(evt);
        }
        if (evt.target.tagName === 'BUTTON') {
          window.keksobooking.util.updateKeydownCoords(evt);
        }
        removeActiveClass();
        window.currentPinIndex = returnIndex(window.pinscoords);
        var newPinIndex = returnIndex(window.pinscoords);
        setActiveClass(newPinIndex);
        var newCardModel = window.keksobooking.card.generateCardModel();

        window.selectors.mapPins.removeChild(document.querySelector('.popup'));
        window.keksobooking.card.fillInCardData(newCardModel, window.keksobooking.pin.serverData.response[newPinIndex]);
      }
    }
  };

  /**
   * @param {Number} index
   */
  var setActiveClass = function (index) {
    window.selectors.getPins()[index].classList.add('map__pin--active');
  };

  var removeActiveClass = function () {
    window.selectors.getActivePin().classList.remove('map__pin--active');
  };

  /**
   * Возвращает индекс элемента по которому производится клик
   * @param { { x: Number, y: Number } } locations
   * @return {Number}
   */
  var returnIndex = function (locations) {
    var index;

    for (var i = 0; i < locations.length; i++) {
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
    onPinPress: onPinPress,
    returnIndex: returnIndex,
    setActiveClass: setActiveClass,
    removeActiveClass: removeActiveClass
  };
})();
