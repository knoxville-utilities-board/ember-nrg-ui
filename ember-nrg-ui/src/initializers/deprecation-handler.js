import { registerDeprecationHandler } from '@ember/debug';
import { deprecationHandler } from '../utils/object-hash';

export function initialize() {
  registerDeprecationHandler(deprecationHandler);
}
