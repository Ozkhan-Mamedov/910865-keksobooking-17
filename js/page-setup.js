'use strict';

(function () {
  var INITIAL_MAIN_PIN_COORDS = [570, ' ' + 375];
  var filters = document.querySelectorAll('.map__filters');

  /**
   * Функция деактивации страницы
   */
  window.disablePage = function () {
    document.querySelector('.map').classList.add('map--faded');
    document.querySelector('.ad-form').classList.add('ad-form--disabled');

    window.addressInput.setAttribute('value', INITIAL_MAIN_PIN_COORDS);
    window.disableElements(window.fieldsetsModified);
    window.disableElements(filters);
  };

  /**
   * Функция активации страницы
   */
  window.enablePage = function () {
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');

    window.enableElements(window.fieldsetsModified);
    window.enableElements(filters);
  };
})();
