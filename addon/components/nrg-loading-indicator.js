import Component from '@ember/component';
import layout from '../templates/components/nrg-loading-indicator';

export default Component.extend({
  layout,
  centered: true,
  loading: true,
  inline: true,
  classNames: ['ui', 'loader'],
  classNameBindings: [
    'loading:active:disabled',
    'centered',
    'inline',
    'text:text',
    'inverted',
    'indeterminate',
    'size',
  ],
});
