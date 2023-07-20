import { set } from '@ember/object';
import { later } from '@ember/runloop';
import FlashObject from 'ember-cli-flash/flash/object';

export function initialize() {
  FlashObject.reopen({
    _startHoverTime: null,
    timerTask(timeout) {
      // Allow a timeout to be specified for function override below
      timeout = timeout ?? this.timeout;
      if (!timeout) {
        return;
      }
      const timerTaskInstance = later(() => {
        this.exitMessage();
      }, timeout);
      set(this, 'timerTaskInstance', timerTaskInstance);
    },
    preventExit() {
      set(this, 'isExitable', false);

      // Stop timer and record when hover started
      set(this, '_startHoverTime', new Date().getTime());
      this._cancelTimer();
    },
    allowExit() {
      // Start timer back up while accounting for hover time
      const hoverTime = new Date().getTime() - this._startHoverTime;
      set(this, '_startHoverTime', null);
      set(this, 'initializedTime', this.initializedTime + hoverTime);
      if (this._getElapsedTime() < this.timeout && !this.sticky) {
        this.timerTask(this.timeout - this._getElapsedTime());
      }

      set(this, 'isExitable', true);
      this._checkIfShouldExit();
    },
  });
}

export default {
  initialize,
};
