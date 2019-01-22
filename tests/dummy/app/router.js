import EmberRouter from '@ember/routing/router';
import config from './config/environment';
import nrgRoutes from 'ember-nrg-ui/router';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  nrgRoutes(this);
  this.route('view-components', function() {
    this.route('nrg-form-container');
    this.route('nrg-home-cards');
    this.route('nrg-loading-indicator');
    this.route('nrg-lightbox');
    this.route('nrg-modal');
    this.route('nrg-list');
    this.route('nrg-search');
  });
  this.route('view-mixins', function() {
    this.route('focus-first-input');
    this.route('global-keyboard-shortcut');
    this.route('context-menu');
    this.route('resize');
  });
  this.route('acceptance', function() {
    this.route('child');
  });
});

export default Router;
