import Modifier from 'ember-modifier';

export default class FocusFirstInputModifier extends Modifier {
  modify(element) {
    const inputs = element.querySelectorAll('input[type=text]:enabled');
    inputs?.[0]?.focus();
  }
}
