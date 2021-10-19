import Controller from '@ember/controller';
import { task, timeout } from 'ember-concurrency';
import Ember from 'ember';

export default Controller.extend({
  counter: 0,

  counterTask: task(function*(counter = 0) {
    this.set('counter', ++counter);
    if (!Ember.testing) {
      yield timeout(1000);
      this.counterTask.perform(counter);
    }
  }).on('init'),
});
