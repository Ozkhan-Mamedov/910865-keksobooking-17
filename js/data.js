'use strict';

(function () {
  /**
   * @param { {author: string,
   *           offer: string,
   *           location: Object[]}[] } objects
   * @param {Element} template шаблон элемента
   * @return {HTMLElement[]}
   */
  var createDomElements = function (objects, template) {
    var PIN_WIDTH = 50;
    var PIN_HEIGHT = 70;
    var elements = [];

    for (var i = 0; i < objects.length; i++) {
      var pinModel = template.cloneNode(true);

      pinModel.querySelector('img').src = objects[i].author.avatar;
      pinModel.querySelector('img').alt = objects[i].offer.title;
      pinModel.style.left = (objects[i].location.x - PIN_WIDTH / 2) + 'px';
      pinModel.style.top = (objects[i].location.y - PIN_HEIGHT) + 'px';

      elements[i] = pinModel;
    }

    return elements;
  };

  /**
   * @param {HTMLElement[]} elements
   */
  var renderElements = function (elements) {
    var nodesFragment = document.createDocumentFragment();

    for (var i = 0; i < elements.length; i++) {
      nodesFragment.appendChild(elements[i]);
    }

    window.selectors.mapPins.appendChild(nodesFragment);
    window.selectors.mapPins.onclick = function (evt) {
      if ((evt.target.tagName === 'IMG') && (evt.target.height === 40)) {
        if (!window.selectors.mapPins.contains(document.querySelector('.map__card'))) {
          var index = extractNumFromSrc(evt.target.attributes.src.value);
          console.log(index);
          //window.keksobooking.card.fillInCardData(window.keksobooking.card.renderCard(), extractNumFromSrc(evt.target.attributes.src.value));
          window.keksobooking.card.fillInCardData(window.keksobooking.card.renderCard(), index - 1);
        }
      }
    };
  };

  var extractNumFromSrc = function (str) {
    var target = parseInt(str.substr(16), 10);

    return target;
  };

  var cleanUpMap = function () {
    var oldPins = window.selectors.mapPins.querySelectorAll('.map__pin[type="button"]');

    oldPins.forEach(function (it) {
      window.selectors.mapPins.removeChild(it);
    });
  };

  window.keksobooking.data = {
    cleanUpMap: cleanUpMap,
    renderElements: renderElements,
    createDomElements: createDomElements
  };
})();
