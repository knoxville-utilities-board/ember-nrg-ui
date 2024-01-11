import { registerDeprecationHandler } from '@ember/debug';
import { deprecationHandler } from 'ember-nrg-ui/utils/object-hash';

export function initialize() {
  registerDeprecationHandler(deprecationHandler);
}
