import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { htmlSafe } from '@ember/string';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
export default class NrgFormComponent extends Component {
  @service
  application;

  @service
  responsive;

  @service
  router;

  @tracked
  mainContentStyle;

  constructor() {
    super(...arguments);
    this.setMainContentStyle();
  }

  get shouldTakeOver() {
    return this.args.shouldTakeOver !== false;
  }

  get renderInModal() {
    return this.responsive.isMobileScreenGroup && this.shouldTakeOver;
  }

  setMainContentStyle() {
    this.mainContentStyle = htmlSafe(
      `height: calc(${window.innerHeight}px - 48px)`
    );
  }

  @action
  onBackArrowClick() {
    this.args.onBackArrowClick?.();
    if (this.args.previousRoute) {
      this.router.transitionTo(this.args.previousRoute);
    }
  }
}
