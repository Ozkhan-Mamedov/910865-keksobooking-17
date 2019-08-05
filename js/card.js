'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var mapPins = document.querySelector('.map__pins');

  /**
   * @param { { offer: { photos: String[] } } } adObject
   */
  var renderImages = function (adObject) {
    var images = adObject.offer.photos;
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
   * @param {String} feature
   */
  var setDisplayStyle = function (feature) {
    document.querySelector('.popup__feature--' + feature).style = 'display: inline-block';
  };

  /**
   * @param { { offer: { features: String[] } } } adObject
   */
  var renderFeature = function (adObject) {
    var features = document.querySelectorAll('.popup__feature');

    features.forEach(function (it) {
      it.style = 'display: none';
    });

    adObject.offer.features.forEach(function (it) {
      setDisplayStyle(it);
    });
  };

  /**
   * @return {Node}
   */
  var generateCardModel = function () {
    var cardModel = cardTemplate.cloneNode(true);

    mapPins.appendChild(cardModel);

    return cardModel;
  };

  /**
   * @param {HTMLElement} cardModel
   * @param { { author: { avatar: String },
     *          offer: { guests: Number,
     *                   type: String,
     *                   title: String,
     *                   address: String,
     *                   price: Number,
     *                   rooms: Number,
     *                   guests: Number,
     *                   checkin: String,
     *                   checkout: String,
     *                   features: String[],
     *                   photos: String[],
     *                   description: String
     *                  },
     *          location: { x: Number,
     *                      y: Number
     *                    }
     *        } } adObject
   */
  var fillInCardData = function (cardModel, adObject) {
    var offerType = '';

    switch (adObject.offer.type) {
      case 'flat':
        offerType = 'Квартира';
        break;

      case 'bungalo':
        offerType = 'Бунгало';
        break;

      case 'house':
        offerType = 'Дом';
        break;

      case 'palace':
        offerType = 'Дворец';
        break;
    }

    cardModel.querySelector('.popup__title').textContent = adObject.offer.title;
    cardModel.querySelector('.popup__text--address').textContent = adObject.offer.address;
    cardModel.querySelector('.popup__text--price').textContent = adObject.offer.price + '₽/ночь';
    cardModel.querySelector('.popup__type').textContent = offerType;
    cardModel.querySelector('.popup__text--capacity').textContent = adObject.offer.rooms + ' комнаты для ' + adObject.offer.guests + ' гостей';
    cardModel.querySelector('.popup__text--time').textContent = 'Заезд после ' + adObject.offer.checkin + ', ' + 'выезд до ' + adObject.offer.checkout;
    renderFeature(adObject);
    cardModel.querySelector('.popup__description').textContent = adObject.offer.description;
    cardModel.querySelector('.popup__photos').src = renderImages(adObject);
    cardModel.querySelector('.popup__avatar').src = adObject.author.avatar;
    document.querySelector('.popup__close').addEventListener('click', function () {
      mapPins.removeChild(document.querySelector('.popup'));
      window.keksobooking.data.currentPinIndex = window.keksobooking.data.returnIndex(window.keksobooking.data.pinscoords);
      window.keksobooking.data.removeActiveClass();
    });
    document.addEventListener('keydown', onEscPress);
  };

  /**
   * @param {KeyboardEvent} keyEvt
   */
  var onEscPress = function (keyEvt) {
    if (keyEvt.keyCode === window.keksobooking.util.ESC_KEYCODE) {
      mapPins.removeChild(document.querySelector('.popup'));
      window.keksobooking.data.removeActiveClass();
      document.removeEventListener('keydown', onEscPress);
    }
  };

  window.keksobooking.card = {
    generateCardModel: generateCardModel,
    fillInCardData: fillInCardData
  };
})();
