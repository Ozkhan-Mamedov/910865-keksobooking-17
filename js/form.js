'use strict';

(function () {
  var accomodationPrice = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var fieldsets = document.querySelectorAll('.ad-form__element');

  /**
   * Функция деактивации элементов
   * @param {HTMLElement[]} elements массив деактивируемых элементов
   */
  window.disableElements = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].setAttribute('disabled', 'disabled');
    }
  };

  /**
   * Функция активации элементов
   * @param {HTMLElement[]} elements массив активируемых элементов
   */
  window.enableElements = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].removeAttribute('disabled');
    }
  };

  /**
   * Функция подстановки атрибутов в элемены
   * @param {Number} value значение атрибутов
   */
  var setPriceAttributes = function (value) {
    priceInput.setAttribute('min', value);
    priceInput.setAttribute('placeholder', value);
  };

  /**
   * Функция сихронизации времени
   * @param {Element} timeInput время относительно которого синхронизируемся
   * @param {Element} targetTimeInput синхронизируемое время
   */
  var synchronizeTimeInputs = function (timeInput, targetTimeInput) {
    targetTimeInput.value = timeInput.value;
  };

  window.fieldsetsModified = window.util.copyElements(fieldsets);
  window.fieldsetsModified.push(document.querySelector('.ad-form-header'));
  window.disablePage();

  var livingTypeInput = document.querySelector('select[name=type]');
  var priceInput = document.querySelector('input[name=price]');

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

  var arrivalTimeInput = document.querySelector('select[id=timein]');
  var departureTimeInput = document.querySelector('select[id=timeout]');

  arrivalTimeInput.addEventListener('change', function () {
    synchronizeTimeInputs(arrivalTimeInput, departureTimeInput);
  });
  departureTimeInput.addEventListener('change', function () {
    synchronizeTimeInputs(departureTimeInput, arrivalTimeInput);
  });
})();

