import { action } from '@ember/object';
import Component from '@glimmer/component';
import { timeout } from 'ember-concurrency';
import { restartableTask } from 'ember-concurrency-decorators';

const defaultPlaceholder = 'Search...';
const defaultSearchTimeout = 400;

export default class NrgListHeaderSearchComponent extends Component {
  get placeholder() {
    return this.args.placeholder ?? defaultPlaceholder;
  }

  get searchTimeout() {
    return this.args.searchTimeout ?? defaultSearchTimeout;
  }

  @restartableTask
  *searchTask(searchString, immediate) {
    if (searchString === null) {
      return;
    }
    if (!immediate) {
      yield timeout(this.searchTimeout);
    }
    this.args.onChange?.(searchString);
  }

  @action
  onSearchInput(searchString) {
    this.searchTask.perform(searchString);
  }

  @action
  onFocus({ target }) {
    target.querySelector('input')?.focus();
  }
}
