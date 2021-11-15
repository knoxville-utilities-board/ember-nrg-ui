/* eslint-env node */
'use strict';

module.exports = function (environment) {
  const ENV = {
    environment,
    modulePrefix: 'dummy',
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false,
      },
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
  };

  if (environment === 'development') {
    // here you can enable a development-specific feature
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'review') {
    ENV.rootURL = process.env.rootURL ?? '/';
    ENV.locationType = 'hash';
    ENV['ember-cli-mirage'] = {
      enabled: true,
    };
  }

  if (environment === 'production') {
    ENV.rootURL = '/ember-nrg-ui';
    ENV.locationType = 'hash';
  }

  return ENV;
};
