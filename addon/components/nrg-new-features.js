import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { htmlSafe } from '@ember/string';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

const defaultWhatsNewText = "What's New";
const defaultHeaderText = 'Dismiss';

export default class NrgNewFeaturesComponent extends Component {
  @service('whats-new')
  whatsNewService;

  @tracked
  canOpen = false;

  get headerText() {
    return this.args.headerText ?? defaultWhatsNewText;
  }

  get primaryButtonText() {
    return this.args.primaryButtonText ?? defaultHeaderText;
  }

  get secondaryButtonText() {
    return this.args.secondaryButtonText ?? '';
  }

  get _isOpen() {
    return this.whatsNewService.isOpen && this.canOpen;
  }

  get htmlContent() {
    return htmlSafe(this.whatsNewService.content);
  }

  @action
  onInsert() {
    this.canOpen = true;
  }

  @action
  onPrimaryClick() {
    this.args.onPrimaryClick?.();
    this.whatsNewService.isOpen = false;
  }

  @action
  onSecondaryClick() {
    this.args.onSecondaryClick?.();
    this.whatsNewService.isOpen = false;
  }
}
