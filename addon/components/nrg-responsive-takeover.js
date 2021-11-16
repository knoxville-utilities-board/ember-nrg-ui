import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { htmlSafe } from '@ember/string';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
export default class NrgFormComponent extends Component {
  @service
  application;

  @service
  resize;

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

  get renderInModal() {
    return this.responsive.isMobileScreenGroup && this.args.shouldTakeOver;
  }

  setMainContentStyle() {
    this.mainContentStyle = htmlSafe(
      `height: calc(${window.innerHeight}px - 48px)`
    );
  }

  @action
  onInsert() {
    this.resize.on('didResize', this, this.setMainContentStyle);
  }

  @action
  onDestroy() {
    this.resize.off('didResize', this, this.setMainContentStyle);
  }

  @action
  onBackArrowClick() {
    this.args.onBackArrowClick?.();
    if (this.previousRoute) {
      this.router.transitionTo(this.previousRoute);
    }
  }
}
