// BEGIN-SNIPPET querying-search
import Controller from '@ember/controller';
import {
  A
} from '@ember/array';
import {
  task,
  timeout
} from 'ember-concurrency';
import {
  alias
} from '@ember/object/computed';

export default Controller.extend({
  items: A([{
    animal: 'rabbit',
    header: 'Alfred',
    description: 'male',
  }, {
    animal: 'rabbit',
    header: 'Betty',
    description: 'female',
  }, {
    animal: 'dog',
    header: 'Bobby',
    description: 'male',
  }, {
    animal: 'dog',
    header: 'Harley',
    description: 'female',
  }, {
    animal: 'cat',
    header: 'Sam',
    description: 'male',
  }, {
    animal: 'cat',
    header: 'Sally',
    description: 'female',
  }]),

  loading: alias('queryTask.isRunning'),

  queryTask: task(function*() {
    yield timeout(2000);
    this.set('items', this.get('items').toArray());
  }),
});
// END-SNIPPET querying-search
