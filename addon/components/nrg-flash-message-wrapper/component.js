import Component from '@ember/component';
import layout from './template';
import InViewportMixin from 'ember-in-viewport';
import { schedule } from '@ember/runloop';

export default Component.extend(InViewportMixin, {
  layout,

  classNames: ['sticky-wrapper'],

  init() {
    this._super(...arguments);
    schedule('afterRender', this, function() {
      this.setProperties({
        viewportSpy: true,
        viewportRefreshRate: 300,
        viewportScrollSensitivity: 10,
      });
    });
  },

  actions: {
    updateHeight(height) {
      this.$().height(height);
    },
  },
});
