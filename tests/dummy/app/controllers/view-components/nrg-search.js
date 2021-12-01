// BEGIN-SNIPPET querying-search
import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { timeout } from 'ember-concurrency';

const options = [
  {
    animal: 'rabbit',
    header: 'Alfred',
    description: 'type 1',
  },
  {
    animal: 'rabbit',
    header: 'Betty',
    description: 'type 2',
  },
  {
    animal: 'dog',
    header: 'Bobby',
    description: 'type 1',
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
