import Route from '@ember/routing/route';
import RoutePageTitleMixin from 'ember-nrg-ui/mixins/route-page-title';

export default Route.extend(RoutePageTitleMixin, {
  afterModel(model) {
    this.set('pageTitle', model.name);
  },
});
