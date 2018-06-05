import {
  alias,
  and,
  or
} from '@ember/object/computed';
import {
  inject as service
} from '@ember/service';
import Component from '@ember/component';
import layout from './template';
import ResizeMixin from 'ember-nrg-ui/mixins/resize';
import {
  htmlSafe
} from '@ember/string';
import {
  computed
} from '@ember/object';

export default Component.extend(ResizeMixin, {
  layout,

  application: service(),

  lightbox: service(),

  responsive: service(),

  sidebarIsOpen: false,

  sidebarMenuIsOpen: alias('application.sidebarMenuIsOpen'),

  classNames: ['nrg-application'],

  classNameBindings: ['fullscreenMap:fullscreen-map', 'computerScreenSidebarActive:large-screen-sidebar-active'],

  isComputerScreen: or('responsive.isComputerScreen', 'responsive.isLargeMonitor', 'responsive.isWidescreenMonitor'),

  title: '',

  init() {
    this._super(...arguments);
    this.set('sidebarMenuIsOpen', true);
  },

  computerScreenSidebarActive: and('isComputerScreen', 'sidebarMenuIsOpen'),

  mainContentStyle: computed('screenHeight', function() {
    return htmlSafe(`height:${this.get('screenHeight')}px`);
  }),

  actions: {
    toggleSidebar() {
      if (this.get('isComputerScreen')) {
        this.toggleProperty('sidebarMenuIsOpen');
      } else {
        this.toggleProperty('sidebarIsOpen');
      }
    },
  },
});
