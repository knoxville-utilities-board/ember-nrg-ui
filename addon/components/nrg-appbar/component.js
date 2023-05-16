import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import ResizeMixin from 'ember-nrg-ui/mixins/resize';
import Component from '@ember/component';
import layout from './template';
import { getOwner } from '@ember/application';
import { task } from 'ember-concurrency';
import { appVersion, electronAppVersion } from 'ember-nrg-ui/utils/nrg-app-version';


export default Component.extend(ResizeMixin, {
  layout,

  title: 'App Title',

  classNames: ['ui', 'menu', 'main', 'fixed', 'inverted'],

  router: service(),

  isMobileScreen: alias('responsive.isMobileScreenGroup'),

  showReleaseNotes: true,

  appVersion,

  init() {
    this._super(...arguments);

    if (window.ELECTRON) {
      this.getElectronAppVersion.perform();
    } else {
      this.set('appVersion', appVersion());
    }
  },

  getElectronAppVersion: task(function* () {
    const appVersion = yield electronAppVersion();

    this.set('appVersion', appVersion);
  }),

  environmentDisplay: computed('applicationSettings.localEnvironment', function() {
    const ENV = getOwner(this).resolveRegistration('config:environment');
    const config = ENV['ember-nrg-ui'];
    const productionEnvironments = (config && config.productionEnvironments) || ['prod'];
    const environment = this.get('applicationSettings.localEnvironment');
    if (environment && !productionEnvironments.includes(environment)) {
      return environment.toUpperCase();
    }
    return null;
  }),

  onToggleSidebar() {
    this.sendAction('toggleSidebar');
  },

  onBackArrowClick() {
    // Implement
  },
});
