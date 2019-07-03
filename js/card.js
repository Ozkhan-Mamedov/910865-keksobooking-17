'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

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

  /**
   * Функция присваивает стиль отображения блока карточкам
   * @param {String} feature особенность
   */
  var setDisplayStyle = function (feature) {
    document.querySelector('.popup__feature--' + feature).style = 'display: inline-block';
  };

  /**
   * Функция отрисовывает требуемые особенности
   */
  var renderFeature = function () {
    var features = document.querySelectorAll('.popup__feature');

    features.forEach(function (it) {
      it.style = 'display: none';
    });

    for (var i = 0; i < window.offer.features.length; i++) {
      setDisplayStyle(window.offer.features[i]);
    }
  };

  /**
   * Функция отрисовывает карточку с информацией
   * @return {HTMLElement}
   */
  window.renderCard = function () {
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
    switch (window.offer.type) {
      case 'flat':
        window.offer.type = 'Квартира';
        break;

      case 'bungalo':
        window.offer.type = 'Бунгало';
        break;

      case 'house':
        window.offer.type = 'Дом';
        break;

      case 'palace':
        window.offer.type = 'Дворец';
        break;
    }

    cardModel.querySelector('.popup__title').textContent = window.serverData.response[0].offer.title;
    cardModel.querySelector('.popup__text--address').textContent = window.serverData.response[0].offer.address;
    cardModel.querySelector('.popup__text--price').textContent = window.offer.price + '₽/ночь';
    cardModel.querySelector('.popup__type').textContent = window.offer.type;
    cardModel.querySelector('.popup__text--capacity').textContent = window.offer.rooms + ' комнаты для ' + window.offer.guests + ' гостей';
    cardModel.querySelector('.popup__text--time').textContent = 'Заезд после ' + window.offer.checkin + ', ' + 'выезд до ' + window.offer.checkout;
    renderFeature();
    cardModel.querySelector('.popup__description').textContent = window.offer.description;
    cardModel.querySelector('.popup__photos').src = renderImages();
    cardModel.querySelector('.popup__avatar').src = window.serverData.response[0].author.avatar;
    document.querySelector('.popup__close').addEventListener('click', function () {
      document.querySelector('.map__pins').removeChild(document.querySelector('.popup'));
    });
  };
})();
