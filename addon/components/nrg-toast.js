import { htmlSafe } from '@ember/template';
import FlashMessage from 'ember-cli-flash/components/flash-message';
export default class Toast extends FlashMessage {
  get progressDuration() {
    const timeout = this.flash.timeout;
    if (!this.showProgress) {
      return '';
    }
    return htmlSafe(`animation-duration: ${timeout}ms;`);
  }
}
