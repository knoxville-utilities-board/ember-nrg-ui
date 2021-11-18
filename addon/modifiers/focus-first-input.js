import Modifier from 'ember-modifier';

export default class FocusFirstInputModifier extends Modifier {
  didInstall() {
    const inputs = this.element.querySelectorAll('input[type=text]:enabled');
    inputs?.[0]?.focus();
  }
}
