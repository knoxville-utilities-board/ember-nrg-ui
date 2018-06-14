import {
  next,
  throttle
} from '@ember/runloop';
import {
  isNone
} from '@ember/utils';
import {
  oneWay,
  alias,
  notEmpty,
  and
} from '@ember/object/computed';
import {
  defineProperty,
  computed,
  observer
} from '@ember/object';
import Mixin from '@ember/object/mixin';

export default Mixin.create({
  init() {
    this._super(...arguments);
    const valuePath = this.get('valuePath');
    defineProperty(this, 'validation', oneWay(`model.validations.attrs.${valuePath}`));

    const {
      value,
      model
    } = this.getProperties('value', 'model');
    if (isNone(value) && !isNone(model)) {
      defineProperty(this, 'value', alias(`model.${valuePath}`));
    }
    next(this, () => {
      if (!this.get('isDestroyed') && this.get('valuePath')) {
        this.propogateErrorMessage();
      }
    });
  },

  errorMessage: oneWay('validation.message'),
  didValidate: alias('field.form.didValidate'),
  hasContent: notEmpty('value'),
  isValid: and('hasContent', 'validation.isTruelyValid'),
  isInvalid: oneWay('validation.isInvalid'),
  showError: computed('validation.isDirty', 'isInvalid', 'didValidate', function() {
    return this.get('didValidate') && this.get('isInvalid');
  }),

  errorMessageObserver: observer('validation.message', 'validation.isDirty', 'isInvalid', 'didValidate', function() {
    throttle(this, this.propogateErrorMessage, 50, false);
  }),

  propogateErrorMessage() {
    if (this.get('isDestroyed') || !this.get('valuePath')) {
      return;
    }
    let errorMessage = '';
    if (this.get('showError')) {
      errorMessage = this.get('validation.message');
    }
    if (this.get('field')) {
      this.set('field.errorMessage', errorMessage);
    }
  },
});
