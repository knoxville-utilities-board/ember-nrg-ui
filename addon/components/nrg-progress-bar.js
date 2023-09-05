import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';

export default class ProgressBarComponent extends Component {
  get progressValue() {
    return this.args.progressValue;
  }
  get progressMax() {
    return this.args.progressMax;
  }
  get progressValueArray() {
    const values = [];
    for (let i = 0; i < this.progressMax; i++) {
      values.push(i);
    }
    return values;
  }
  get progressPercentage() {
    return (parseInt(this.progressValue) / this.progressMax) * 100;
  }
  get infillStylingString() {
    return htmlSafe(
      `background-color: ${this.args.barColor}; width: ${this.sectionWidth}%;`
    );
  }

  get labelColorString() {
    return htmlSafe(`color: ${this.args.labelColor};`);
  }
}
