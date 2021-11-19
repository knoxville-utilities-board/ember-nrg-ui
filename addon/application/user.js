import EmberObject from '@ember/object';
import Evented from '@ember/object/evented';
import { A } from '@ember/array';

export default class ApplicationUser extends EmberObject.extend(Evented) {
  name = '';

  get roles() {
    return A();
  }
}
