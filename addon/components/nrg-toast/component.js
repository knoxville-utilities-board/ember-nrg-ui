import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import { htmlSafe } from '@ember/string';
import FlashMessage from 'ember-cli-flash/components/flash-message';
import layout from './template';

export default FlashMessage.extend({
  layout,

  classNames: ['floating', 'toast-box', 'compact', 'transition', 'visible'],

  flash: alias('toast'),

  showProgress: computed('toast.showProgress', 'toast.sticky', 'toast.timeout', function() {
    const timeout = this.get('toast.timeout');
    const showProgress = this.get('toast.showProgress');
    const sticky = this.get('toast.sticky');
    return showProgress && timeout && !sticky;
  }),

  progressDuration: computed('toast.timeout', function() {
    const timeout = this.get('toast.timeout');
    if (!this.showProgress) {
      return;
    }
    return htmlSafe(`animation-duration: ${timeout}ms;`);
  }),
});
