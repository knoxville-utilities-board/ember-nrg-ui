import Component from '@ember/component';
import { assert } from '@ember/debug';
import { alias, and, not, reads } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import layout from './template';

export default Component.extend({
  layout,

  applicationService: service('application'),

  responsive: service('responsive'),

  router: service('router'),

  isMobileScreen: alias('responsive.isMobileScreenGroup'),

  title: reads('applicationService.pageTitle'),

  renderInModal: and('isMobileScreen', 'shouldTakeOver'),

  renderInPlace: not('renderInModal'),

  onBackArrowClick() {
    assert(
      'You must implment the onBackArrowClick action or provide a previousRoute',
      this.previousRoute
    );
    if (this.previousRoute) {
      this.router.transitionTo(this.previousRoute);
    }
  },
});
