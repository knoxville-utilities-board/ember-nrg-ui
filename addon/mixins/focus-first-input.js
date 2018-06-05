import {
  scheduleOnce,
  next
} from '@ember/runloop';
import Mixin from '@ember/object/mixin';

export default Mixin.create({
  init() {
    this._super(...arguments);
    scheduleOnce('afterRender', this, 'focusFirstInput');
  },

  focusFirstInput() {
    next(() => {
      const isDestroyed = this.get('isDestroying') || this.get('isDestroyed');
      if (!isDestroyed) {
        const inputs = this.$('input[type=text]:enabled');
        inputs && inputs.first().focus();
      }
    });
  },
});
