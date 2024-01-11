import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';

export default class ProgressBarComponent extends Component {
  get progressValue() {
    return this.args.progressValue ?? 1;
  }
  get progressMax() {
    return this.args.progressMax ?? 5;
  }
  get infillColor() {
    return this.args.infillColor ?? 'blue';
  }
  get isAnimated() {
    return this.args.isAnimated ?? true;
  }
  get showDots() {
    return this.args.showDots ?? true;
  }
  get showCurrentDot() {
    return this.args.showCurrentDot ?? true;
  }
  get showLabel() {
    return this.args.showLabel ?? true;
  }
  get labelColor() {
    return this.args.labelColor ?? 'black';
  }
  get stepArray() {
    return [...Array(this.args.progressMax).keys()];
  }
  get stepWidth() {
    return (parseInt(this.args.progressValue) / this.args.progressMax) * 100;
  }
  get stepWidthString() {
    return htmlSafe(`width: ${this.stepWidth}%`);
  }

  get absoluteWidthString() {
    return htmlSafe(`left: ${this.stepWidth}%`);
  }
  get infillStylingString() {
    return htmlSafe(
      `background-color: ${this.args.infillColor}; width: ${this.stepWidth}%;`
    );
  }

  get labelColorString() {
    return htmlSafe(`color: ${this.args.labelColor};`);
  }
}
