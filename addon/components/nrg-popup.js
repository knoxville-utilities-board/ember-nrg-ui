import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { timeout } from 'ember-concurrency';
import { restartableTask } from 'ember-concurrency-decorators';

export default class NrgPopupComponent extends Component {
  @tracked
  isOpen;

  hoverTimeout = 250;

  @restartableTask
  *hoverTask(hovering) {
    const hoverTimeout = this.args.hoverTimeout || this.hoverTimeout;
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
