// BEGIN-SNIPPET querying-search
import { A } from '@ember/array';
import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';
import { task, timeout } from 'ember-concurrency';

export default Controller.extend({
  options: A([
    {
      animal: 'rabbit',
      header: 'Alfred',
      description: 'male',
    },
    {
      animal: 'rabbit',
      header: 'Betty',
      description: 'female',
    },
    {
      animal: 'dog',
      header: 'Bobby',
      description: 'male',
    },
    {
      animal: 'dog',
      header: 'Harley',
      description: 'female',
    },
    {
      animal: 'cat',
      header: 'Sam',
      description: 'male',
    },
    {
      animal: 'cat',
      header: 'Sally',
      description: 'female',
    },
  ]),

  loading: alias('queryTask.isRunning'),

  queryTask: task(function*() {
    yield timeout(2000);
    this.set('items', this.options.toArray());
  }),
});
// END-SNIPPET querying-search
