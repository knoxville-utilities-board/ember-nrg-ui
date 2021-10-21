import EmberRouter from '@ember/routing/router';
import nrgRoutes from 'ember-nrg-ui/router';
import config from 'dummy/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  nrgRoutes(this);
  this.route('master-detail', function () {
    this.route('detail', {
      path: '/:name',
    });
  });
  this.route('toasts');
  this.route('view-components', function () {
    this.route('nrg-dropdown');
    this.route('nrg-error-pages');
    this.route('nrg-forms');
    this.route('nrg-home-cards');
    this.route('nrg-lightbox');
    this.route('nrg-list');
    this.route('nrg-loading-indicator');
    this.route('nrg-modal');
    this.route('nrg-popup');
    this.route('nrg-search');
  });
  this.route('view-mixins', function () {
    this.route('focus-first-input');
    this.route('global-keyboard-shortcut');
    this.route('context-menu');
    this.route('resize');
  });
  this.route('acceptance', function () {
    this.route('child');
  });
});
