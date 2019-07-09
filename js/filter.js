'use strict';

(function () {
  var PIN_NUM = 5;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var housingTypeFilter = document.querySelector('#housing-type');

  /**
   * Фильтр - обработчик типа жилья
   */
  var updatePins = function () {
    var sameLivingType = window.keksobooking.pin.serverData.response.filter(function (it) {
      if (housingTypeFilter.value === 'any') {
        return it.offer.type;
      } else {
        return it.offer.type === housingTypeFilter.value;
      }
    });

    /**
     * @return {Number}
     */
    var getFilteredListIndex = function () {
      var pins = window.selectors.mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
      var indexes = [];

      for (var i = 0; i < pins.length; i++) { // ?
        for (var key in window.pinsIndex) {
          if (window.pinsIndex[key] === window.pinsIndex[pins[i].attributes.style.nodeValue]) {
            indexes.push(window.pinsIndex[pins[i].attributes.style.nodeValue]);
          }
        }
      }

      return indexes[window.keksobooking.data.returnIndex(window.pinscoords)];
    };

    window.keksobooking.data.cleanUpMap();
    window.keksobooking.data.renderElements(window.keksobooking.data.createDomElements(sameLivingType.slice(0, PIN_NUM), window.selectors.pinTemplate));
    window.selectors.mapPins.removeEventListener('click', window.keksobooking.data.onPinClick);
    window.selectors.mapPins.addEventListener('click', function (evt) {
      if ((evt.target.tagName === 'IMG') && (evt.target.height === 40)) {
        if (!window.selectors.mapPins.contains(document.querySelector('.map__card'))) {
          window.x = evt.target.offsetParent.offsetLeft + PIN_WIDTH / 2;
          window.y = evt.target.offsetParent.offsetTop + PIN_HEIGHT;

          window.keksobooking.card.fillInCardData(window.keksobooking.card.generateCardModel(), getFilteredListIndex());
        }
      }
    });
  };

  housingTypeFilter.addEventListener('change', updatePins);
})();
