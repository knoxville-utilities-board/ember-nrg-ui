import { inject as service } from '@ember/service';
import { readOnly } from '@ember/object/computed';
import Mixin from '@ember/object/mixin';

export default Mixin.create({
  resizeService: service('resize'),

  responsive: service(),

  resizeEventsEnabled: true,

  resizeDebouncedEventsEnabled: true,

  screenWidth: readOnly('responsive.screenWidth'),

  screenHeight: readOnly('responsive.screenHeight'),

  didInsertElement() {
    this._super(...arguments);
    if (this.resizeEventsEnabled) {
      this.resizeService.on('didResize', this, this._handleResizeEvent);
    }
    if (this.resizeDebouncedEventsEnabled) {
      this.resizeService.on('debouncedDidResize', this, this._handleDebouncedResizeEvent);
    }
  },

  willDestroyElement() {
    this._super(...arguments);
    if (this.resizeEventsEnabled) {
      this.resizeService.off('didResize', this, this._handleResizeEvent);
    }
    if (this.resizeDebouncedEventsEnabled) {
      this.resizeService.off('debouncedDidResize', this, this._handleDebouncedResizeEvent);
    }
  },

  didResize(/*width, height, evt*/) {
    // Overridden in subclass
  },

  debouncedDidResize(/*width, height, evt*/) {
    // Overridden in subclass
  },

  _handleResizeEvent(evt) {
    const { innerWidth, innerHeight } = window;
    this.didResize(innerWidth, innerHeight, evt);
  },

  _handleDebouncedResizeEvent(evt) {
    const { innerWidth, innerHeight } = window;
    this.debouncedDidResize(innerWidth, innerHeight, evt);
  },
});
