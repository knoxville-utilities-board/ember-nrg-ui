import { modifier } from 'ember-modifier';

export default modifier(function focusFirstInput(element) {
  const inputs = element.querySelectorAll('input[type=text]:enabled');
  inputs?.[0]?.focus();
});
