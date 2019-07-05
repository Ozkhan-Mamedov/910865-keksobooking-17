'use strict';

(function () {
  /**
   * @return {Element}
   */
  var getMainPin = function () {
    return document.querySelector('.map__pin--main');
  };

  /**
   * @return {Element}
   */
  var getMapElement = function () {
    return document.querySelector('.map');
  };

  /**
   * @return {Element}
   */
  var getMapPins = function () {
    return document.querySelector('.map__pins');
  };

  /**
   * @return {Element}
   */
  var getAddressInput = function () {
    return document.querySelector('#address');
  };

  /**
   * @return {Element}
   */
  var getFormElement = function () {
    return document.querySelector('.ad-form');
  };

  /**
   * @return {Element}
   */
  var getPinTemplate = function () {
    return document.querySelector('#pin').content.querySelector('.map__pin');
  };

  window.selectors = {
    mapPins: getMapPins(),
    mainPin: getMainPin(),
    map: getMapElement(),
    addressInput: getAddressInput(),
    form: getFormElement(),
    pinTemplate: getPinTemplate()
  };
})();
