import Controller from '@ember/controller';
import { task, timeout } from 'ember-concurrency';

export default Controller.extend({
  counter: 0,

  counterTask: task(function*(counter = 0) {
    yield timeout(1000);
    this.set('counter', ++counter);
    this.get('counterTask').perform(counter);
  }).on('init'),
});
