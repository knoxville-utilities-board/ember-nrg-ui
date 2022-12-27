import { next, throttle } from '@ember/runloop';
import { isNone } from '@ember/utils';
import { oneWay, alias, notEmpty, and } from '@ember/object/computed';
import { defineProperty, computed, observer } from '@ember/object';
import Mixin from '@ember/object/mixin';

export default Mixin.create({
  init() {
    this._super(...arguments);
    const valuePath = this.valuePath;
    defineProperty(this, 'validation', oneWay(`model.validations.attrs.${valuePath}`));

    const { value, model } = this;
    if (isNone(value) && !isNone(model)) {
      defineProperty(this, 'value', alias(`model.${valuePath}`));
    }
    next(this, () => {
      if (!this.isDestroyed && this.valuePath) {
        this.propogateErrorMessage();
      }
    });
  },

  errorMessage: oneWay('validation.message'),

  didValidate: alias('field.form.didValidate'),

  hasContent: notEmpty('value'),

  isValid: and('hasContent', 'validation.isTruelyValid'),

  isInvalid: oneWay('validation.isInvalid'),

  hasWarnings: oneWay('validation.hasWarnings'),

  showError: computed('validation.isDirty', 'isInvalid', 'didValidate', function() {
    return this.didValidate && this.isInvalid;
  }),

  showWarning: computed('validation.isDirty', 'hasWarnings', 'showError', function() {
    return this.hasWarnings && !this.showError;
  }),

  errorMessageObserver: observer('validation.message', 'validation.isDirty', 'isInvalid', 'didValidate', function() {
    throttle(this, this.propogateErrorMessage, 50, false);
  }),

  propogateErrorMessage() {
    if (this.isDestroyed || !this.valuePath) {
      return;
    }
    let errorMessage = '';
    let warningMessage = '';
    if (this.showError) {
      errorMessage = this.get('validation.message');
    }
    if (this.showWarning) {
      warningMessage = this.get('validation.warningMessage');
    }
    if (this.field) {
      this.set('field.errorMessage', errorMessage);
      this.set('field.warningMessage', warningMessage);
    }
  },
});
