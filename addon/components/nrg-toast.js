import { htmlSafe } from '@ember/string';
import FlashMessage from 'ember-cli-flash/components/flash-message';

export default class Toast extends FlashMessage {
  get showProgress() {
    const timeout = this.flash.timeout;
    const showProgress = this.flash.showProgress;
    const sticky = this.flash.sticky;
    return showProgress && timeout && !sticky;
  }

  get progressDuration() {
    const timeout = this.flash.timeout;
    if (!this.showProgress) {
      return '';
    }
    return htmlSafe(`animation-duration: ${timeout}ms;`);
  }
}
