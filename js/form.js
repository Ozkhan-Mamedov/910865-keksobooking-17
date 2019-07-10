'use strict';

(function () {
  var ESC_KEYCODE = 27;
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

  var onWindowClick = function () {
    document.querySelector('main').removeChild(document.querySelector('.success'));
    document.removeEventListener('click', onWindowClick);
    document.removeEventListener('keydown', onEscPress);
  };

  var onEscPress = function (keyEvt) {
    if (keyEvt.keyCode === ESC_KEYCODE) {
      document.querySelector('main').removeChild(document.querySelector('.success'));
      document.removeEventListener('keydown', onEscPress);
      document.removeEventListener('click', onWindowClick);
    }
  };

  var onSuccess = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var successBlock = successTemplate.cloneNode(true);

    document.querySelector('main').appendChild(successBlock);
    document.addEventListener('keydown', onEscPress);
    document.addEventListener('click', onWindowClick);
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
  document.querySelector('.ad-form').addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.keksobooking.backend.upload(new FormData(document.querySelector('.ad-form')), onSuccess, window.keksobooking.pin.onError);
  });
})();

