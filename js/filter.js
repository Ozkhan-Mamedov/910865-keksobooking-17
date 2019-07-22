'use strict';

(function () {
  var PIN_NUM = 5;
  var PIN_IMG_HEIGHT = 40;
  var PIN_HEIGHT = 70;
  var LOW_PRICE_RANGE = 10000;
  var HIGH_PRICE_RANGE = 50000;
  var ENTER_KEYCODE = 13;
  var filter = document.querySelector('.map__filters');
  var housingTypeFilter = document.querySelector('#housing-type');
  var housingPriceFilter = document.querySelector('#housing-price');
  var housingRoomsFilter = document.querySelector('#housing-rooms');
  var housingGuestsFilter = document.querySelector('#housing-guests');
  var wifiFilter = document.querySelector('#filter-wifi');
  var dishwasherFilter = document.querySelector('#filter-dishwasher');
  var parkingFilter = document.querySelector('#filter-parking');
  var washerFilter = document.querySelector('#filter-washer');
  var elevatorFilter = document.querySelector('#filter-elevator');
  var conditionerFilter = document.querySelector('#filter-conditioner');

  /**
   * @return {Number}
   */
  var getFilteredListIndex = function () {
    var pins = window.selectors.mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
    var indexes = [];

    for (var i = 0; i < pins.length; i++) {
      for (var key in window.pinsIndex) {
        if (window.pinsIndex[key] === window.pinsIndex[pins[i].attributes.style.nodeValue]) {
          indexes.push(window.pinsIndex[pins[i].attributes.style.nodeValue]);
        }
      }
    }

    return indexes[window.keksobooking.data.returnIndex(window.pinscoords)];
  };

  /**
   * @param {KeyboardEvent} keyEvt
   */
  var onNewPinPress = function (keyEvt) {
    if (keyEvt.keyCode === ENTER_KEYCODE) {
      if (keyEvt.target.clientHeight === PIN_HEIGHT) {
        if (!window.selectors.mapPins.contains(document.querySelector('.map__card'))) {
          window.keksobooking.util.updateKeydownCoords(keyEvt);
          window.currentPinIndex = window.keksobooking.data.returnIndex(window.pinscoords);
          window.keksobooking.data.setActiveClass(window.currentPinIndex);
          var cardModel = window.keksobooking.card.generateCardModel();

          window.keksobooking.card.fillInCardData(cardModel, window.keksobooking.pin.serverData.response[getFilteredListIndex()]);
        } else {
          window.keksobooking.util.updateKeydownCoords(keyEvt);
          window.keksobooking.data.removeActiveClass();
          window.currentPinIndex = window.keksobooking.data.returnIndex(window.pinscoords);
          var newPinIndex = window.keksobooking.data.returnIndex(window.pinscoords);
          window.keksobooking.data.setActiveClass(newPinIndex);
          var newCardModel = window.keksobooking.card.generateCardModel();

          window.selectors.mapPins.removeChild(document.querySelector('.popup'));
          window.keksobooking.card.fillInCardData(newCardModel, window.keksobooking.pin.serverData.response[getFilteredListIndex()]);
        }
      }
    }
  };

  /**
   * @param {MouseEvent} evt
   */
  var onNewPinClick = function (evt) {
    if (((evt.target.tagName === 'IMG') && (evt.target.height === PIN_IMG_HEIGHT)) || ((evt.target.tagName === 'BUTTON') && (evt.target.clientHeight === PIN_HEIGHT))) {
      if (!window.selectors.mapPins.contains(document.querySelector('.map__card'))) {
        if (evt.target.tagName === 'IMG') {
          window.keksobooking.util.updateClickCoords(evt);
        }
        if (evt.target.tagName === 'BUTTON') {
          window.keksobooking.util.updateKeydownCoords(evt);
        }
        window.keksobooking.card.fillInCardData(window.keksobooking.card.generateCardModel(), window.keksobooking.pin.serverData.response[getFilteredListIndex()]);
        window.currentPinIndex = window.keksobooking.data.returnIndex(window.pinscoords);
        window.keksobooking.data.setActiveClass(window.currentPinIndex);
      } else {
        var newCardModel = window.keksobooking.card.generateCardModel();

        window.currentPinIndex = window.keksobooking.data.returnIndex(window.pinscoords);
        if (evt.target.tagName === 'IMG') {
          window.keksobooking.util.updateClickCoords(evt);
        }
        if (evt.target.tagName === 'BUTTON') {
          window.keksobooking.util.updateKeydownCoords(evt);
        }
        window.keksobooking.data.removeActiveClass();

        var newPinIndex = window.keksobooking.data.returnIndex(window.pinscoords);

        window.keksobooking.data.setActiveClass(newPinIndex);
        window.selectors.mapPins.removeChild(document.querySelector('.popup'));
        window.keksobooking.card.fillInCardData(newCardModel, window.keksobooking.pin.serverData.response[getFilteredListIndex()]);
      }
    }
  };

  /**
   * Обработчик фильтра
   */
  var updatePins = function () {
    /**
     * @param { { author: { avatar: String },
     *            offer: { type: String },
     *            location: { x: Number, y: Number }
     *          } } it
     * @return {String|boolean}
     */
    var getTypeFilterChange = function (it) {
      if (housingTypeFilter.value === 'any') {
        return it.offer.type;
      } else {
        return it.offer.type === housingTypeFilter.value;
      }
    };

    /**
     * @param { { author: { avatar: String },
     *            offer: { price: Number },
     *            location: { x: Number, y: Number }
     *          } } it
     * @return {boolean|Number}
     */
    var getPriceFilterChange = function (it) {
      if (housingPriceFilter.value === 'any') {
        return it.offer.price;
      } else {
        var sum;

        if (it.offer.price < LOW_PRICE_RANGE) {
          sum = 'low';
        }
        if (it.offer.price >= HIGH_PRICE_RANGE) {
          sum = 'high';
        }
        if ((it.offer.price >= LOW_PRICE_RANGE) && (it.offer.price < HIGH_PRICE_RANGE)) {
          sum = 'middle';
        }

        return sum === housingPriceFilter.value;
      }
    };

    /**
     * @param { { author: { avatar: String },
     *            offer: { rooms: Number },
     *            location: { x: Number, y: Number }
     *          } } it
     * @return {boolean|Number}
     */
    var getRoomsFilterChange = function (it) {
      if (housingRoomsFilter.value === 'any') {
        return it.offer.rooms;
      } else {
        return it.offer.rooms === parseInt(housingRoomsFilter.value, 10);
      }
    };

    /**
     * @param { { author: { avatar: String },
     *            offer: { guests: Number },
     *            location: { x: Number, y: Number }
     *          } } it
     * @return {boolean|Number}
     */
    var getGuestsFilterChange = function (it) {
      if (housingGuestsFilter.value === 'any') {
        return it.offer.guests;
      } else {
        if (housingGuestsFilter.value === '0') {
          return it.offer.guests === parseInt(housingGuestsFilter.value, 10);
        }

        return it.offer.guests >= housingGuestsFilter.value;
      }
    };

    /**
     * @param {HTMLInputElement} feature
     * @param {String} name
     * @return {Function}
     */
    var getFeaturesFilterChange = function (feature, name) {
      return function (it) {
        if (feature.checked) {
          return (it.offer.features.indexOf(name) !== -1);
        }

        return it;
      };
    };

    window.keksobooking.data.cleanUpMap();
    window.keksobooking.util.closePopup();
    var filteredpins = window.keksobooking.pin.serverData.response.filter(getTypeFilterChange)
      .filter(getPriceFilterChange)
      .filter(getRoomsFilterChange)
      .filter(getGuestsFilterChange)
      .filter(getFeaturesFilterChange(wifiFilter, 'wifi'))
      .filter(getFeaturesFilterChange(dishwasherFilter, 'dishwasher'))
      .filter(getFeaturesFilterChange(parkingFilter, 'parking'))
      .filter(getFeaturesFilterChange(washerFilter, 'washer'))
      .filter(getFeaturesFilterChange(elevatorFilter, 'elevator'))
      .filter(getFeaturesFilterChange(conditionerFilter, 'conditioner'));
    window.keksobooking.data.renderElements(window.keksobooking.data.createDomElements(filteredpins.slice(0, PIN_NUM), window.selectors.pinTemplate));
    window.selectors.mapPins.removeEventListener('click', window.keksobooking.data.onPinClick);
    window.selectors.mapPins.removeEventListener('keydown', window.keksobooking.data.onPinPress);
    window.selectors.mapPins.addEventListener('keydown', onNewPinPress);
    window.selectors.mapPins.addEventListener('click', onNewPinClick);
  };

  filter.addEventListener('change', function () {
    window.keksobooking.debounce.debounce(updatePins);
  });

  window.keksobooking.filter = {
    onNewPinClick: onNewPinClick,
    onNewPinPress: onNewPinPress
  };
})();
