'use strict';

(function () {
  var housingTypeFilter = document.querySelector('#housing-type');

  /**
   * Фильтр - обработчик типа жилья
   */
  var updatePins = function () {
    var sameLivingType = window.serverData.response.filter(function (it) {
      if (housingTypeFilter.value === 'any') {
        return it.offer.type;
      } else {
        return it.offer.type === housingTypeFilter.value;
      }
    });

    window.cleanUpMap();
    window.renderElements(window.createDomElements(sameLivingType.slice(0, window.PIN_NUM), window.template));
  };

  housingTypeFilter.addEventListener('change', updatePins);
})();
