import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
export default class NrgFormComponent extends Component {
  @tracked
  didValidate = false;

  @action
  submit(event) {
    event.preventDefault();
    event.stopPropagation();

    this.didValidate = true;
    this.args.onSubmit && this.args.onSubmit();
  }
}
