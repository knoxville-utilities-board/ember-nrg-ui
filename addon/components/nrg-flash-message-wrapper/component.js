import Component from '@ember/component';
import layout from './template';
import InViewportMixin from 'ember-in-viewport';
import { setProperties } from '@ember/object';

export default Component.extend(InViewportMixin, {
  layout,

  classNames: ['sticky-wrapper'],

  init() {
    this._super(...arguments);
    setProperties(this, {
      viewportSpy: true,
      viewportRefreshRate: 300,
      viewportScrollSensitivity: 10,
      viewportTolerance: {
        top: -50,
      },
    });
  },

  actions: {
    updateHeight(height) {
      this.$().height(height);
    },
  },
});
