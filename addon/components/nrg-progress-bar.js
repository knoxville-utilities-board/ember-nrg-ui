import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';

export default class ProgressBarComponent extends Component {
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
