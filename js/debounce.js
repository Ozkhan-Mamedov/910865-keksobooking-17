'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout;

  /**
   * @param {Function} cb
   */
  var debounce = function (cb) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  };

  window.keksobooking.debounce = {
    debounce: debounce
  };
})();
