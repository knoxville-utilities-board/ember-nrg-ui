import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { deprecate } from '@ember/debug';

export default class NrgAppbarComponent extends Component {
  @service
  router;

  @service
  application;

  get showAppVersion() {
    deprecate(
      'showReleaseNotes is deprecated, please use showAppVersion instead',
      this.args.showReleaseNotes === undefined,
      {
        id: 'nrg-appbar.show-release-notes',
        until: '5.0.0',
      }
    );
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
