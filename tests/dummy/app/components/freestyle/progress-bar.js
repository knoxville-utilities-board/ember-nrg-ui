import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class FreestyleNrgPopupComponent extends Component {
  @tracked
  maxStep = 5;

  @tracked
  currentStep = 1;

  @tracked
  isAnimated = true;
}
