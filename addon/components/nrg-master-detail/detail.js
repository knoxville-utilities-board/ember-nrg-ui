import Component from '@ember/component';
import { inject as service } from '@ember/service';
import layout from '../../templates/components/nrg-master-detail/detail';
import { computed } from '@ember/object';

export default Component.extend({
  layout,

  router: service(),

  classNames: ['ui', 'segment', 'master-detail--detail'],

  baseRoute: computed('router.currentRouteName', function() {
    const currentRouteName = this.router.currentRouteName;
    const routeSegments = currentRouteName.split('.');
    routeSegments.pop();
    return routeSegments.join('.');
  }),

  shouldTakeOver: computed('router.currentRouteName', function() {
    return `${this.baseRoute}.index` !== this.router.currentRouteName;
  }),

  onBackArrowClick() {
    this.router.transitionTo(this.baseRoute);
  },
});
