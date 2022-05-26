import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
export default class NrgFormComponent extends Component {
  @tracked
  _didValidate = false;

  get didValidate() {
    return this.args.didValidate ?? this._didValidate;
  }

  @action
  submit(event) {
    event.preventDefault();
    event.stopPropagation();

    this._didValidate = true;
    this.args.onSubmit?.();
  }
}
