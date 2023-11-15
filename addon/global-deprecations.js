import { default as EmberComponent } from '@ember/component';
import { default as GlimmerComponent } from '@glimmer/component';
import { default as NrgValidationComponent } from 'ember-nrg-ui/components/nrg-validation-component';

export default [
  {
    id: 'components.class',
    affected: [EmberComponent, GlimmerComponent, NrgValidationComponent],
    test(target) {
      return target.args.class;
    },
    message:
      'Passing a `@class` argument to `%s` is deprecated. Use the native HTML attribute `class` instead.',
    since: '4.5.1',
    until: '6.0.0',
  },
];
