import { setModifierManager } from '@ember/modifier';
import { guidFor } from '@ember/object/internals';

export default setModifierManager(
  owner => ({
    createModifier() {
      return {
        element: null,
        clickHandler: null,
        disabled: false,
      };
    },

    installModifier(state, element, args) {
      const [callback] = args.positional;
      const { disabled } = args.named;

      const guid = guidFor(element);

      const clickHandler = function(event) {
        const foundTargetInWrapper = event.target.closest(`[data-click-handler=${guid}]`);
        if (!foundTargetInWrapper && !owner.isDestroying && !state.disabled) {
          callback();
        }
        return false;
      };

      state.element = element;
      state.clickHandler = clickHandler;
      state.disabled = disabled;

      element.dataset.clickHandler = guid;

      document.documentElement.addEventListener('click', clickHandler, true);
    },

    updateModifier(state, args) {
      const { disabled } = args.named;
      state.disabled = disabled;
    },

    destroyModifier(state) {
      if (state.element) {
        delete state.element.dataset.clickHandler;
      }
      document.documentElement.removeEventListener('click', state.clickHandler, true);
      state.clickHandler = null;
    },
  }),
  class OnClickOutsideModifer {}
);
