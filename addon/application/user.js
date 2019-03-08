import EmberObject from '@ember/object';
import Evented from '@ember/object/evented';
import { computed } from '@ember/object';

export default EmberObject.extend(Evented, {
  name: '',

  roles: computed(function() {
    return [];
  }),
});
