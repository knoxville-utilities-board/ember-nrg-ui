import { default as EmberComponent } from '@ember/component';
import { default as GlimmerComponent } from '@glimmer/component';
import { default as NrgValidationComponent } from 'ember-nrg-ui/components/nrg-validation-component';

import type { Deprecation } from 'ember-nrg-ui/utils/deprecation-handler';

export default [
  {
    id: 'components.class',
    affected: [EmberComponent, GlimmerComponent, NrgValidationComponent],
    test(target: NrgValidationComponent) {
      return Boolean(target.args.class);
    },
    message:
      'Passing a `@class` argument to `%s` is deprecated. Use the native HTML attribute `class` instead.',
    since: {
      enabled: '4.5.1',
    },
    until: '6.0.0',
  },
] as Deprecation[];
