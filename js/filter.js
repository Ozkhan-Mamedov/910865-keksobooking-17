'use strict';

(function () {
  var PIN_NUM = 5;
  var housingTypeFilter = document.querySelector('#housing-type');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

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

    window.keksobooking.data.cleanUpMap();
    window.keksobooking.data.renderElements(window.keksobooking.data.createDomElements(sameLivingType.slice(0, PIN_NUM), pinTemplate));
  };

  housingTypeFilter.addEventListener('change', updatePins);
})();
