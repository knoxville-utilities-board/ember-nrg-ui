import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';

export default class NrgAppbarComponent extends Component {
  @service
  router;

  @service
  application;

  get showAppVersion() {
    return this.args.showAppVersion !== false;
  }

  get environmentDisplay() {
    const productionEnvironments = this.application.environmentConfig?.[
      'ember-nrg-ui'
    ]?.productionEnvironments ?? ['prod'];
    const environment = this.application.settings?.localEnvironment;
    if (environment && !productionEnvironments.includes(environment)) {
      return environment.toUpperCase();
    }
    return null;
  }

  @action
  onToggleSidebar(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.args.onToggleSidebar?.();
  }

  @action
  onBackArrowClick(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.args.onBackArrowClick?.();
  }
}
