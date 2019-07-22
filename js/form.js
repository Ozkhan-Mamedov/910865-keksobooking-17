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
  var roomNumberInput = document.querySelector('select[id=room_number]');
  var guestNumberInput = document.querySelector('select[id=capacity]');
  var resetButton = document.querySelector('.ad-form__reset');

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

  var synchronizeGuestRoomInputs = function () {
    var selections = [];

    switch (roomNumberInput.value) {
      case '1':
        selections = [0, 1, 3];
        window.keksobooking.pagesetup.enableFieldProperties(guestNumberInput);
        window.keksobooking.pagesetup.setDisabledProperty(selections);
        guestNumberInput.selectedIndex = 2;
        break;

      case '2':
        selections = [0, 3];
        window.keksobooking.pagesetup.enableFieldProperties(guestNumberInput);
        window.keksobooking.pagesetup.setDisabledProperty(selections);
        guestNumberInput.selectedIndex = 1;
        break;

      case '3':
        window.keksobooking.pagesetup.enableFieldProperties(guestNumberInput);
        guestNumberInput.children[3].setAttribute('disabled', '');
        guestNumberInput.selectedIndex = 0;
        break;

      case '100':
        selections = [0, 1, 2];
        window.keksobooking.pagesetup.enableFieldProperties(guestNumberInput);
        window.keksobooking.pagesetup.setDisabledProperty(selections);
        guestNumberInput.selectedIndex = 3;
        break;
    }
  };

  var onWindowClick = function () {
    document.querySelector('main').removeChild(document.querySelector('.success'));
    document.removeEventListener('click', onWindowClick);
    document.removeEventListener('keydown', onEscPress);
  };

  /**
   * @param {KeyboardEvent} keyEvt
   */
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
  roomNumberInput.addEventListener('change', function () {
    synchronizeGuestRoomInputs();
  });
  resetButton.addEventListener('click', function () {
    var selections = [0, 1, 3];

    window.keksobooking.pagesetup.enableFieldProperties(guestNumberInput);
    window.keksobooking.pagesetup.setDisabledProperty(selections);
    window.keksobooking.pagesetup.disablePage();
    window.isReseted = true;
  });
  document.querySelector('.ad-form').addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.keksobooking.backend.upload(new FormData(document.querySelector('.ad-form')), onSuccess, window.keksobooking.pin.onError);
  });
})();

