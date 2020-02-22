import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import { htmlSafe } from '@ember/string';
import FlashMessage from 'ember-cli-flash/components/flash-message';
import layout from './template';

export default FlashMessage.extend({
  layout,

  classNames: ['floating', 'toast-box', 'compact', 'transition', 'visible'],

  flash: alias('toast'),

  didInsertElement() {
    this._super(...arguments);
    this.set('_mouseEnterHandler', this._mouseEnter.bind(this));
    this.set('_mouseLeaveHandler', this._mouseLeave.bind(this));
    this.element.addEventListener('mouseenter', this._mouseEnterHandler);
    this.element.addEventListener('mouseleave', this._mouseLeaveHandler);
  },

  willDestroyElement() {
    this._super(...arguments);
    this.element.removeEventListener('mouseenter', this._mouseEnterHandler);
    this.element.removeEventListener('mouseleave', this._mouseLeaveHandler);
  },

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
