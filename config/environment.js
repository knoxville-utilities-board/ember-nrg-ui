/* eslint-env node */
'use strict';

module.exports = function (/* environment, appConfig */) {
  return {
    pageTitle: {
      prepend: false,
      replace: true,
    },
  };
};
