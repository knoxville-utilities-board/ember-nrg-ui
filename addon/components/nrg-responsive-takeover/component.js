import Component from '@ember/component';
import { assert } from '@ember/debug';
import { computed } from '@ember/object';
import { alias, and, not, reads } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { htmlSafe } from '@ember/string';
import ResizeMixin from 'ember-nrg-ui/mixins/resize';
import layout from './template';

export default Component.extend(ResizeMixin, {
  layout,

  applicationService: service('application'),

  responsive: service('responsive'),

  router: service('router'),

  isMobileScreen: alias('responsive.isMobileScreenGroup'),

  title: reads('applicationService.pageTitle'),

  renderInModal: and('isMobileScreen', 'shouldTakeOver'),

  renderInPlace: not('renderInModal'),

  mainContentStyle: computed('screenHeight', function() {
    return htmlSafe(`height: calc(${this.get('screenHeight')}px - 48px`);
  }),

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
