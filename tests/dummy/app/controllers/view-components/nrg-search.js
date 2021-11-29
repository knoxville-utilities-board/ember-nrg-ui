// BEGIN-SNIPPET querying-search
import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { timeout } from 'ember-concurrency';

const options = [
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
];

export default class ViewComponentsNrgSearchController extends Controller {
  @tracked
  queryString = null;

  @tracked
  selectedResult = null;

  @action
  async query(queryString) {
    this.queryString = queryString;
    await timeout(2000);
    return options;
  }
}
// END-SNIPPET querying-search
