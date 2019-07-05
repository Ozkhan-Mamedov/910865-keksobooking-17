'use strict';

(function () {
  var accomodationPrice = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };
  var livingTypeInput = document.querySelector('select[name=type]');
  var priceInput = document.querySelector('input[name=price]');
  var arrivalTimeInput = document.querySelector('select[id=timein]');
  var departureTimeInput = document.querySelector('select[id=timeout]');

  /**
   * @param {Number} value значение атрибутов
   */
  var setPriceAttributes = function (value) {
    priceInput.setAttribute('min', value.toString());
    priceInput.setAttribute('placeholder', value.toString());
  };

  /**
   * @param {HTMLInputElement} timeInput время относительно которого синхронизируемся
   * @param {HTMLInputElement} targetTimeInput синхронизируемое время
   */
  var synchronizeTimeInputs = function (timeInput, targetTimeInput) {
    targetTimeInput.value = timeInput.value;
  };

  window.keksobooking.pagesetup.disablePage();
  livingTypeInput.addEventListener('change', function () {
    switch (livingTypeInput.value) {
      case 'bungalo':
        setPriceAttributes(accomodationPrice['bungalo']);
        break;

      case 'flat':
        setPriceAttributes(accomodationPrice['flat']);
        break;

      case 'house':
        setPriceAttributes(accomodationPrice['house']);
        break;

      case 'palace':
        setPriceAttributes(accomodationPrice['palace']);
        break;
    }
  });
  arrivalTimeInput.addEventListener('change', function () {
    synchronizeTimeInputs(arrivalTimeInput, departureTimeInput);
  });
  departureTimeInput.addEventListener('change', function () {
    synchronizeTimeInputs(departureTimeInput, arrivalTimeInput);
  });
})();

