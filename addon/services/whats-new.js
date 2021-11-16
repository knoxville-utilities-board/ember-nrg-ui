import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class WhatsNewService extends Service {
  @tracked
  content = '';

  @tracked
  isOpen;

  get hasContent() {
    return !!this.content;
  }

  constructor() {
    super(...arguments);
    this.isOpen = this.hasContent;
  }
}
