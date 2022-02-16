import { htmlSafe } from '@ember/template';
import FlashMessage from 'ember-cli-flash/components/flash-message';
export default class Toast extends FlashMessage {
  get flash() {
    return this.toast;
  }

  get progressDuration() {
    const timeout = this.toast?.timeout;
    if (!this.toast.showProgress) {
      return '';
    }
    return htmlSafe(`animation-duration: ${timeout}ms;`);
  }
}
