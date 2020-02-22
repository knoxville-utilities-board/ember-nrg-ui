import Component from '@ember/component';
import { computed } from '@ember/object';
import { alias, and, or, reads } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { htmlSafe } from '@ember/string';
import ResizeMixin from 'ember-nrg-ui/mixins/resize';
import layout from './template';

export default Component.extend(ResizeMixin, {
  layout,

  application: service(),

  lightbox: service(),

  modal: service(),

  responsive: service(),

  flashMessages: service(),

  sidebarIsOpen: false,

  sidebarMenuIsOpen: alias('application.sidebarMenuIsOpen'),

  classNames: ['nrg-application'],

  classNameBindings: ['fullscreenMap:fullscreen-map', 'computerScreenSidebarActive:large-screen-sidebar-active'],

  isComputerScreen: or('responsive.isComputerScreen', 'responsive.isLargeMonitor', 'responsive.isWidescreenMonitor'),

  title: reads('application.pageTitle'),

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
    clickedLink(item) {
      if (this.clickedSidebarItem) {
        this.clickedSidebarItem(item);
      }
    },
  },
});
