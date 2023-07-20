/* eslint-env node */
'use strict';

module.exports = function (/* environment, appConfig */) {
  return {
    'ember-tether': {
      bodyElementId: 'popup-container',
    },

    pageTitle: {
      prepend: false,
      replace: true,
    },
  };
};
