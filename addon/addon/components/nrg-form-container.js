import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
export default class NrgFormComponent extends Component {
  @tracked
  internalDidValidate = false;

  get didValidate() {
    return this.args.didValidate ?? this.internalDidValidate;
  }

  @action
  submit(event) {
    event.preventDefault();
    event.stopPropagation();

    this.internalDidValidate = true;
    this.args.onSubmit?.();
  }
}
