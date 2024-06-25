import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { restartableTask, timeout } from 'ember-concurrency';
import { AddNrgDeprecations } from 'ember-nrg-ui/utils/deprecation-handler';

const defaultHoverTimeout = 250;

@AddNrgDeprecations()
export default class NrgPopupComponent extends Component {
  @tracked
  isOpen;

  hoverTask = restartableTask(async (hovering) => {
    const hoverTimeout = this.args.hoverTimeout ?? defaultHoverTimeout;
    await timeout(hoverTimeout);
    this.isOpen = hovering;
  });

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
