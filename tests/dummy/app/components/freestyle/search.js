import Component from '@glimmer/component';
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
    header: 'Charlie',
    description: 'type 1',
    disabled: true,
  },
  {
    animal: 'cat',
    header: 'David',
    description: 'type 2',
  },
];

export default class FreestyleNrgSearchComponent extends Component {
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
