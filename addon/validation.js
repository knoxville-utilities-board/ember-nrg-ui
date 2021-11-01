import { typeOf } from '@ember/utils';
import { validate } from 'ember-validators';
import messages from 'ember-validators/messages';

export default function validationState(validatorsArgument) {
  return () => {
    return {
      get() {
        let validators = validatorsArgument;

        if (typeOf(validatorsArgument) === 'function') {
          validators = validatorsArgument(this);
        }

        const attrState = {};

        let formValid = true;

        for (const key in validators) {
          attrState[key] = {
            warningMessage: null,
            message: null,
            isValid: true,
          };

          for (const validator of validators[key]) {
            const validatorResponse = validator.apply(this, [
              this[key],
              messages,
            ]);

            if (validatorResponse.valid) {
              attrState[key].warningMessage = validatorResponse.warningMessage;
              continue;
            }

            attrState[key].message = validatorResponse.errorMessage;
            attrState[key].isValid = false;
            break;
          }
        }

        for (const key in attrState) {
          formValid = attrState[key].isValid;
          if (!formValid) {
            break;
          }
        }

        return { isValid: formValid, attrs: attrState };
      },
    };
  };
}

export function validator(eventName, options) {
  if (typeof options === 'boolean') {
    const originalOption = options;
    options = {};
    options[eventName] = originalOption;
  }
  return function (value, messages) {
    const validationResponse = validate(eventName, value, options);

    if (!options.description) {
      options.description = messages.defaultDescription;
    }

    if (typeof validationResponse === 'boolean' && validationResponse) {
      return {
        valid: true,
      };
    }

    const message =
      options.message ||
      messages.getMessageFor(validationResponse.type, options);

    if (options.isWarning) {
      return {
        valid: true,
        warningMessage: message,
      };
    } else {
      return {
        valid: false,
        errorMessage: message,
      };
    }
  };
}
