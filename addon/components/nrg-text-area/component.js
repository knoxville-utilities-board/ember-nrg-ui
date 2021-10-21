import { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import Component from '@ember/component';
import layout from './template';
import Validation from 'ember-nrg-ui/mixins/validation';

export default Component.extend(Validation, {
  layout,

  classNames: ['ui', 'fluid', 'input', 'nrg-text-area'],

  classNameBindings: ['fluid'],

  characterLimit: readOnly('validation.options.length.max'),

  overCharacterLimit: computed('characterLimit', 'value.length', function() {
    return this.characterLimit < this.get('value.length');
  }),
});
