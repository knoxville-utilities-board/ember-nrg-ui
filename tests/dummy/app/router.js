import EmberRouter from '@ember/routing/router';
import nrgRoutes from 'ember-nrg-ui/router';
import config from 'dummy/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  nrgRoutes(this);
  this.route('side-by-side', function () {
    this.route('detail', {
      path: '/:name',
    });
  });
  this.route('toasts');
  this.route('view-components', function () {
    this.route('nrg-application');
    this.route('nrg-dropdown');
    this.route('nrg-error-pages');
    this.route('nrg-forms');
    this.route('nrg-home-cards');
    this.route('nrg-lightbox');
    this.route('nrg-list');
    this.route('nrg-loading-indicator');
    this.route('nrg-modal');
    this.route('nrg-popup');
    this.route('nrg-render-template-block');
    this.route('nrg-search');
    this.route('nrg-context-item');
    this.route('nrg-button');
    this.route('nrg-text-field');
    this.route('nrg-text-area');
    this.route('nrg-datetime');
    this.route('nrg-checkbox');
  });
  this.route('view-mixins', function () {
    this.route('focus-first-input');
  });
  this.route('view-modifiers', function () {
    this.route('focus-first-input');
    this.route('on-click-outside');
    this.route('on-resize');
  });
  this.route('acceptance', function () {
    this.route('child');
  });
  this.route('validation-tests');
  this.route('dynamic-field-validations');
});
