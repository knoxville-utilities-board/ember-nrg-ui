import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import ResizeMixin from 'ember-nrg-ui/mixins/resize';
import Component from '@ember/component';
import layout from './template';
import { getOwner } from '@ember/application';
import config from 'ember-get-config';
import { shaRegExp } from 'ember-cli-app-version/utils/regexp';
import { task } from 'ember-concurrency';

const {
  APP: { version },
} = config;

export default Component.extend(ResizeMixin, {
  layout,

  title: 'App Title',

  classNames: ['ui', 'menu', 'main', 'fixed', 'inverted'],

  router: service(),

  isMobileScreen: alias('responsive.isMobileScreenGroup'),

  showReleaseNotes: true,

  appVersion: '',

  init() {
    this._super(...arguments);

    if (window.ELECTRON) {
      this.getElectronAppVersionTask.perform();
    } else {
      this.getAppVersion();
    }
  },

  getElectronAppVersionTask: task(function* () {
    const electronAppVersion =
      yield window.electronBridge.getCurrentElectronAppVersion();

    this.set('appVersion', electronAppVersion);
  }),

  getAppVersion() {
    const parts = version.split('+');
    const isTag = parts.length === 1;
    let displayVersion = `v${version}`;

    if (!isTag) {
      displayVersion = version.match(shaRegExp)[0];
    }

    this.set('appVersion', displayVersion);
  },

  environmentDisplay: computed(
    'applicationSettings.localEnvironment',
    function () {
      const ENV = getOwner(this).resolveRegistration('config:environment');
      const config = ENV['ember-nrg-ui'];
      const productionEnvironments = (config &&
        config.productionEnvironments) || ['prod'];
      const environment = this.get('applicationSettings.localEnvironment');
      if (environment && !productionEnvironments.includes(environment)) {
        return environment.toUpperCase();
      }
      return null;
    }
  ),

  onToggleSidebar() {
    this.sendAction('toggleSidebar');
  },

  onBackArrowClick() {
    // Implement
  },
});
