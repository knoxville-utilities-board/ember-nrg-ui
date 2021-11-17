import { alias } from '@ember/object/computed';
import { htmlSafe } from '@ember/string';
import FlashMessage from 'ember-cli-flash/components/flash-message';

export default class Toast extends FlashMessage {
  @alias('toast') flash;

  get showProgress() {
    const timeout = this.get('toast.timeout');
    const showProgress = this.get('toast.showProgress');
    const sticky = this.get('toast.sticky');
    return showProgress && timeout && !sticky;
  }

  get progressDuration() {
    const timeout = this.get('toast.timeout');
    if (!this.showProgress) {
      return;
    }
    return htmlSafe(`animation-duration: ${timeout}ms;`);
  }
}
