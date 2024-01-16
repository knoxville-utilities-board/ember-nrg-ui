import Modifier from 'ember-modifier';

export default class FocusFirstInputModifier extends Modifier {
  modify(element: HTMLElement) {
    const inputs: NodeListOf<HTMLElement> = element.querySelectorAll(
      'input[type=text]:enabled'
    );
    inputs?.[0]?.focus();
  }
}
