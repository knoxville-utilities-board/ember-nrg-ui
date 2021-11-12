import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { timeout } from 'ember-concurrency';
import { restartableTask } from 'ember-concurrency-decorators';

const defaultHoverTimeout = 250;

export default class NrgPopupComponent extends Component {
  @tracked
  isOpen;

  @restartableTask
  *hoverTask(hovering) {
    const hoverTimeout = this.args.hoverTimeout ?? defaultHoverTimeout;
    yield timeout(hoverTimeout);
    this.isOpen = hovering;
  }

  @action
  getTarget(element) {
    this.target = element;
  }

  @action
  onMouseEnter() {
    this.hoverTask.perform(true);
  }

  @action
  onMouseLeave() {
    this.hoverTask.perform(false);
  }
}
