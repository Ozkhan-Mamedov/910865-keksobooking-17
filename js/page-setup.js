'use strict';

(function () {
  var PIN_NUM = 5;
  var INITIAL_MAIN_PIN_COORDS = {
    x: 570,
    y: 375
  };
  var filters = document.querySelectorAll('.map__filter');
  var checkboxfilters = document.querySelectorAll('.map__checkbox');
  var fieldsets = document.querySelectorAll('.ad-form__element');
  var fieldsetsModified = window.keksobooking.util.copyElements(fieldsets);
  var guestNumberInput = document.querySelector('select[id=capacity]');
  var priceInput = document.querySelector('#price');
  var options = [0, 1, 3];

  var disablePage = function () {
    window.keksobooking.util.closePopup();
    enableFieldProperties(guestNumberInput);
    window.selectors.map.classList.add('map--faded');
    window.selectors.form.classList.add('ad-form--disabled');
    window.selectors.addressInput.setAttribute('value', window.keksobooking.util.formatCoords(INITIAL_MAIN_PIN_COORDS));
    window.selectors.mainPin.style = 'left: 570px; top: 375px;';
    window.keksobooking.data.cleanUpMap();
    window.isActivated = false;
    setDisabledProperty(options);
    disableElements(fieldsetsModified);
    disableElements(filters);
    disableElements(checkboxfilters);
    priceInput.placeholder = 1000;
  };

  var enablePage = function () {
    window.selectors.map.classList.remove('map--faded');
    window.selectors.form.classList.remove('ad-form--disabled');
    window.keksobooking.data.renderElements(window.pins.slice(0, PIN_NUM));
    enableElements(fieldsetsModified);
    enableElements(filters);
    enableElements(checkboxfilters);
  };

  /**
   * Функция деактивации элементов формы
   * @param {NodeListOf} elements
   */
  var disableElements = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].setAttribute('disabled', 'disabled');
    }
  };

  /**
   * Функция активации элементов формы
   * @param {NodeListOf} elements
   */
  var enableElements = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].removeAttribute('disabled');
    }
  };

  /**
   * @param {Number[]} selections массив индексов элементов к которым нужно применить disabled
   */
  var setDisabledProperty = function (selections) {
    for (var i = 0; i < selections.length; i++) {
      guestNumberInput.children[selections[i]].setAttribute('disabled', '');
    }
  };

  /**
   * @param {Element} inputField
   */
  var enableFieldProperties = function (inputField) {
    for (var i = 0; i < inputField.children.length; i++) {
      inputField.children[i].removeAttribute('disabled');
    }
  };

  fieldsetsModified.push(document.querySelector('.ad-form-header'));

  window.keksobooking.pagesetup = {
    enablePage: enablePage,
    disablePage: disablePage,
    setDisabledProperty: setDisabledProperty,
    enableFieldProperties: enableFieldProperties
  };
})();
