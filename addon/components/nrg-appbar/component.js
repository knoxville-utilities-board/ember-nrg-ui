import {
  computed
} from '@ember/object';
import {
  lt,
} from '@ember/object/computed';
import {
  inject as service
} from '@ember/service';
import ResizeMixin, {
  computerBreakpoint,
} from 'ember-nrg-ui/mixins/resize';
import Component from '@ember/component';
import layout from './template';

export default Component.extend(ResizeMixin, {
  layout,

  title: 'App Title',

  classNames: ['ui', 'menu', 'main', 'fixed', 'inverted'],

  router: service(),

  isMobileScreen: lt('screenWidth', computerBreakpoint),

  environmentDisplay: computed('applicationSettings.localEnvironment', function() {
    const environment = this.get('applicationSettings.localEnvironment');
    if (environment && environment !== 'prod') {
      return environment.toUpperCase();
    }
    return null;
  }),

  actions: {
    toggleSidebar() {
      this.sendAction('toggleSidebar');
    },
  },
});
