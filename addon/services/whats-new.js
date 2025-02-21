import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class WhatsNewService extends Service {
  @tracked
  content = '';

  @tracked
  _isOpen;

  get isOpen() {
    return this._isOpen ?? this.hasContent;
  }

  set isOpen(value) {
    this._isOpen = value;
  }

  get hasContent() {
    return !!this.content;
  }
}
