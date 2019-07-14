'use strict';

(function () {
  var PIN_NUM = 5;
  var PIN_IMG_HEIGHT = 40;
  var LOW_PRICE_RANGE = 10000;
  var HIGH_PRICE_RANGE = 50000;
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
   * Фильтр - обработчик типа жилья
   */
  var updatePins = function () {
    /**
     * @param { {author: String,
     *           offer: String,
     *           location: {x: Number, y: Number}} } it
     * @return {boolean|*}
     */
    var getTypeFilterChange = function (it) {
      if (housingTypeFilter.value === 'any') {
        return it.offer.type;
      } else {
        return it.offer.type === housingTypeFilter.value;
      }
    };

    /**
     * @param { {author: String,
     *           offer: String,
     *           location: {x: Number, y: Number}} } it
     * @return {Document.price|String|boolean}
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
     * @param { {author: String,
     *           offer: String,
     *           location: {x: Number, y: Number}} } it
     * @return {Document.rooms|String|boolean}
     */
    var getRoomsFilterChange = function (it) {
      if (housingRoomsFilter.value === 'any') {
        return it.offer.rooms;
      } else {
        return it.offer.rooms === parseInt(housingRoomsFilter.value, 10);
      }
    };

    /**
     * @param { {author: String,
     *           offer: String,
     *           location: {x: Number, y: Number}} } it
     * @return {boolean|*}
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
     * @param {Element} feature
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

    window.keksobooking.data.cleanUpMap();
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
    window.selectors.mapPins.addEventListener('click', function (evt) {
      if ((evt.target.tagName === 'IMG') && (evt.target.height === PIN_IMG_HEIGHT)) {
        if (!window.selectors.mapPins.contains(document.querySelector('.map__card'))) {
          window.keksobooking.util.updateClickCoords(evt);
          window.keksobooking.card.fillInCardData(window.keksobooking.card.generateCardModel(), getFilteredListIndex());
        } else {
          var newCardModel = window.keksobooking.card.generateCardModel();

          window.keksobooking.util.updateClickCoords(evt);
          window.selectors.mapPins.removeChild(document.querySelector('.popup'));
          window.keksobooking.card.fillInCardData(newCardModel, getFilteredListIndex());
        }
      }
    });
  };

  filter.addEventListener('change', function () {
    window.keksobooking.debounce.debounce(updatePins);
  });
})();
