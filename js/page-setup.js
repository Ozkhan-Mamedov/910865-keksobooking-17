'use strict';

(function () {
  var PIN_NUM = 5;
  var INITIAL_MAIN_PIN_COORDS = {
    x: 570,
    y: 375
  };
  var filters = document.querySelectorAll('.map__filter');
  var filterForm = document.querySelector('.map__filters');
  var checkboxfilters = document.querySelectorAll('.map__checkbox');
  var fieldsets = document.querySelectorAll('.ad-form__element');
  var fieldsetsModified = window.keksobooking.util.copyElements(fieldsets);
  var guestNumberInput = document.querySelector('select[id=capacity]');
  var priceInput = document.querySelector('#price');
  var map = document.querySelector('.map');
  var form = document.querySelector('.ad-form');
  var mapPins = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');
  var activePin = document.querySelector('.map__pin--active');
  var addressInput = document.querySelector('#address');
  var options = [0, 1, 3];

  var disablePage = function () {
    window.keksobooking.util.closePopup();
    enableFieldProperties(guestNumberInput);
    map.classList.add('map--faded');
    form.reset();
    form.classList.add('ad-form--disabled');
    addressInput.setAttribute('value', window.keksobooking.util.formatCoords(INITIAL_MAIN_PIN_COORDS));
    mainPin.style = 'left: 570px; top: 375px;';
    window.keksobooking.data.cleanUpMap();
    setDisabledProperty(options);
    disableElements(fieldsetsModified);
    disableElements(filters);
    disableElements(checkboxfilters);
    filterForm.reset();
    priceInput.placeholder = 1000;

    if (window.keksobooking.pagesetup.isActivated === true) {
      mapPins.removeEventListener('click', window.keksobooking.filter.onNewPinClick);
    }

    window.keksobooking.pagesetup.isActivated = false;
  };

  var enablePage = function () {
    if (window.keksobooking.filter.onNewPinClick) {
      mapPins.removeEventListener('click', window.keksobooking.filter.onNewPinClick);
      mapPins.removeEventListener('keydown', window.keksobooking.filter.onNewPinPress);
    }

    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');

    if (window.isReseted === true) {
      window.keksobooking.data.pinscoords = window.keksobooking.data.initialpinscoords;
    }

    window.keksobooking.data.renderElements(window.keksobooking.pin.pins.slice(0, PIN_NUM));
    enableElements(fieldsetsModified);
    enableElements(filters);
    enableElements(checkboxfilters);

    if (activePin) {
      window.keksobooking.data.removeActiveClass();
    }
  };

  /**
   * Функция деактивации элементов формы
   * @param {NodeListOf} elements
   */
  var disableElements = function (elements) {
    elements.forEach(function (it) {
      it.setAttribute('disabled', 'disabled');
    });
  };

  /**
   * Функция активации элементов формы
   * @param {NodeListOf} elements
   */
  var enableElements = function (elements) {
    elements.forEach(function (it) {
      it.removeAttribute('disabled');
    });
  };

  /**
   * @param {Number[]} selections массив индексов элементов к которым нужно применить disabled
   */
  var setDisabledProperty = function (selections) {
    selections.forEach(function (it) {
      guestNumberInput.children[it].setAttribute('disabled', '');
    });
  };

  /**
   * @param {Element} inputField
   */
  var enableFieldProperties = function (inputField) {
    var fields = window.keksobooking.util.copyElements(inputField.children);

    fields.forEach(function (it) {
      it.removeAttribute('disabled');
    });
  };

  fieldsetsModified.push(document.querySelector('.ad-form-header'));

  window.keksobooking.pagesetup = {
    enablePage: enablePage,
    disablePage: disablePage,
    setDisabledProperty: setDisabledProperty,
    enableFieldProperties: enableFieldProperties
  };
})();
