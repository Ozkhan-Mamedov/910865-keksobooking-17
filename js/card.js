'use strict';

(function () {
  /**
   * Функция отрисовывает карточку с информацией
   * @return {HTMLElement}
   */
  window.renderCard = function () {
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var cardModel = cardTemplate.cloneNode(true);
    var mapPins = document.querySelector('.map__pins');

    mapPins.appendChild(cardModel);

    return cardModel;
  };

  /**
   * Функция заполняет карточку данными с сервера
   * @param {HTMLElement} cardModel объект карточки
   */
  window.fillInCardData = function (cardModel) {
    var offer = window.serverData.response[0].offer;
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

    /**
     * Функция получает особенности(features)
     * @return {String}
     */
    /*
    var getFeatures = function () {
      var arr = window.serverData.response[0].offer.features;
      var features = '';

      for (var i = 0; i < arr.length; i++) {
        switch (arr[i]) {
          case 'wifi':
            features += 'Wi-Fi';
            break;

          case 'dishwasher':
            features += 'посудомоечная машина';
            break;

          case 'parking':
            features += 'парковка';
            break;

          case 'washer':
            features += 'стиральная машина';
            break;

          case 'elevator':
            features += 'лифт';
            break;

          case 'conditioner':
            features += 'кондиционер';
            break;
        }

        if (i !== arr.length - 1) {
          features += ', ';
        }
      }

      return features;
    };
    */

    /**
     * Функция отрисовывает изображения в карточке
     */
    var renderImages = function () {
      var images = window.serverData.response[0].offer.photos;
      var imgTemplate = cardTemplate.querySelector('.popup__photo');
      var nodes = document.createDocumentFragment();
      var imgContainer = document.querySelector('.popup__photos');

      imgContainer.removeChild(document.querySelector('.popup__photo'));

      for (var i = 0; i < images.length; i++) {
        var imgModel = imgTemplate.cloneNode(true);

        imgModel.src = images[i];
        nodes.appendChild(imgModel);
      }

      imgContainer.appendChild(nodes);
    };

    switch (offer.type) {
      case 'flat':
        offer.type = 'Квартира';
        break;

      case 'bungalo':
        offer.type = 'Бунгало';
        break;

      case 'house':
        offer.type = 'Дом';
        break;

      case 'palace':
        offer.type = 'Дворец';
        break;
    }

    /**
     *
     */
    var renderFeature = function () {
      var features = document.querySelectorAll('.popup__feature');

      features.forEach(function (it) {
        it.style = 'display: none';
      });

      for (var i = 0; i < offer.features.length; i++) {
        switch (offer.features[i]) {
          case 'wifi':
            document.querySelector('.popup__feature--wifi').style = 'display: inline-block';
            break;

          case 'dishwasher':
            document.querySelector('.popup__feature--dishwasher').style = 'display: inline-block';
            break;

          case 'parking':
            document.querySelector('.popup__feature--parking').style = 'display: inline-block';
            break;

          case 'washer':
            document.querySelector('.popup__feature--washer').style = 'display: inline-block';
            break;

          case 'elevator':
            document.querySelector('.popup__feature--elevator').style = 'display: inline-block';
            break;

          case 'conditioner':
            document.querySelector('.popup__feature--conditioner').style = 'display: inline-block';
            break;
        }
      }
    };

    cardModel.querySelector('.popup__title').textContent = window.serverData.response[0].offer.title;
    cardModel.querySelector('.popup__text--address').textContent = window.serverData.response[0].offer.address;
    cardModel.querySelector('.popup__text--price').textContent = offer.price + '₽/ночь';
    cardModel.querySelector('.popup__type').textContent = offer.type;
    cardModel.querySelector('.popup__text--capacity').textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
    cardModel.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.checkin + ', ' + 'выезд до ' + offer.checkout;
    renderFeature();
    cardModel.querySelector('.popup__description').textContent = offer.description;
    cardModel.querySelector('.popup__photos').src = renderImages();
    cardModel.querySelector('.popup__avatar').src = window.serverData.response[0].author.avatar;
    document.querySelector('.popup__close').addEventListener('click', function () {
      document.querySelector('.map__pins').removeChild(document.querySelector('.popup'));
    });
  };
})();
