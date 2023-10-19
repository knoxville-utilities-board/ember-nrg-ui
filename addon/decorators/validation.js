import { get } from '@ember/object';
import { typeOf } from '@ember/utils';
import { validate } from 'ember-validators';
import messages from 'ember-validators/messages';

export default function validationState(validatorsArgument) {
  return () => {
    return {
      get() {
        let validators = validatorsArgument;

        if (typeOf(validatorsArgument) === 'function') {
          validators = validatorsArgument.apply(this);
        }

        const attrState = {};

        let formValid = true;

        for (const key in validators) {
          attrState[key] = {
            warningMessage: null,
            message: null,
            isValid: true,
            options: {},
          };

          let validatorArray = validators[key];

          if (!Array.isArray(validatorArray)) {
            validatorArray = [validatorArray];
          }

          for (const validator of validatorArray) {
            const validatorResponse = validator.apply(this, [
              get(this, key),
              messages,
            ]);

            attrState[key].options[validatorResponse.validator] =
              validatorResponse.options;

            if (!attrState[key].isValid) {
              continue;
            }

            if (validatorResponse.valid) {
              attrState[key].warningMessage = validatorResponse.warningMessage;
              continue;
            }

            const disabledProp = validatorResponse?.options?.disabled;
            let isDisabled = disabledProp;
            if (typeof disabledProp == 'function') {
              isDisabled = disabledProp.apply(this);
            }
            if (isDisabled) {
              continue;
            }

            attrState[key].message = validatorResponse.errorMessage;
            attrState[key].isValid = false;
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
    let validationResponse;

    const computedOptions = { ...options };
    for (const option in computedOptions) {
      if (
        typeof computedOptions[option] === 'function' &&
        option !== 'validate'
      ) {
        computedOptions[option] = options[option].apply(this);
      }
    }

    if (eventName === 'custom') {
      validationResponse = computedOptions.validate?.apply(this, [value]);
    } else {
      validationResponse = validate(eventName, value, computedOptions);
    }

    if (!computedOptions.description) {
      computedOptions.description = messages.defaultDescription;
    }

    const response = {
      validator: eventName,
      options: computedOptions,
      valid: true,
    };

    if (typeof validationResponse === 'boolean' && validationResponse) {
      return response;
    }

    let message;

    if (eventName === 'custom') {
      message =
        validationResponse ||
        (computedOptions.message ?? 'This field is not valid');
    } else {
      message =
        computedOptions.message ||
        messages.getMessageFor(validationResponse.type, computedOptions);
    }

    if (computedOptions.isWarning) {
      response.warningMessage = message;
    } else {
      response.valid = false;
      response.errorMessage = message;
    }
    return response;
  };
}
