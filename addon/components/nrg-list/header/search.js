import { action } from '@ember/object';
import Component from '@glimmer/component';
import { restartableTask, timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import { AddNrgDeprecations } from 'ember-nrg-ui/utils/deprecation-handler';

const defaultPlaceholder = 'Search...';
const defaultSearchTimeout = 400;

@AddNrgDeprecations()
export default class NrgListHeaderSearchComponent extends Component {
  @service
  application;

  get isTesting() {
    return this.application.isTesting ?? false;
  }

  get placeholder() {
    return this.args.placeholder ?? defaultPlaceholder;
  }

  get searchTimeout() {
    if (this.isTesting) {
      return 0;
    }
    return this.args.searchTimeout ?? defaultSearchTimeout;
  }

  searchTask = restartableTask(async (searchString, immediate) => {
    if (searchString === null) {
      return;
    }
    if (!immediate) {
      await timeout(this.searchTimeout);
    }
    this.args.onChange?.(searchString);
  });

  @action
  onSearchInput(searchString) {
    this.searchTask.perform(searchString);
  }

  @action
  onFocus({ target }) {
    target.querySelector('input')?.focus();
  }
}
