import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { timeout } from 'ember-concurrency';
import { keepLatestTask } from 'ember-concurrency-decorators';

export default class NrgValidationComponent extends Component {
  @tracked
  _value;

  get value() {
    if (this.hasModelPath) {
      return this.args.model[this.args.valuePath];
    } else {
      return this._value;
    }
  }

  set value(newValue) {
    if (this.hasModelPath) {
      this.args.model[this.args.valuePath] = newValue;
    } else {
      this._value = newValue;
    }
  }

  constructor() {
    super(...arguments);
    if (this.hasModelPath) {
      this.value = this.args.model[this.args.valuePath];
    } else if (this.args.value) {
      this.value = this.args.value;
    }
    this.propogateErrorMessage.perform();
  }

  get hasModelPath() {
    return this.args.model && this.args.valuePath;
  }

  get hasWarning() {
    return this.validation?.warningMessage;
  }

  get validation() {
    return this.args.model?.validations?.attrs[this.args.valuePath];
  }

  @action
  _onChange(newValue) {
    this.value = newValue;
    this.args.onChange?.(...arguments);
    this.propogateErrorMessage.perform();
  }

  @keepLatestTask
  *propogateErrorMessage() {
    if (!this.args.valuePath) {
      return;
    }
    let errorMessage = '';
    let warningMessage = '';
    if (!this.validation?.isValid) {
      errorMessage = this.validation?.message;
    }
    if (this.hasWarning) {
      warningMessage = this.validation?.warningMessage;
    }
    if (this.args.field) {
      this.args.field.errorMessage = errorMessage;
      this.args.field.warningMessage = warningMessage;
    }
    yield timeout(50);
  }
}
