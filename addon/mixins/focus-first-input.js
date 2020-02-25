import { scheduleOnce, next } from '@ember/runloop';
import Mixin from '@ember/object/mixin';

export default Mixin.create({
  init() {
    this._super(...arguments);
    scheduleOnce('afterRender', this, 'focusFirstInput');
  },

  focusFirstInput() {
    next(() => {
      if (this.isDestroying) {
        return;
      }
      const inputs = this.element.querySelectorAll('input[type=text]:enabled');
      inputs && inputs[0] && inputs[0].focus();
    });
  },
});
