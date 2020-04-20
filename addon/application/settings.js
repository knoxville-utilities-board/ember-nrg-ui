import EmberObject from '@ember/object';
import Evented from '@ember/object/evented';

export default EmberObject.extend(Evented, {
  localEnvironment: 'prod',
});
