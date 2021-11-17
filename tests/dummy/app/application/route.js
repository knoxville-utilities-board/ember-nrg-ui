import Route from '@ember/routing/route';

export default Route.extend({
  pageTitle: 'NRG UI',

  actions: {
    routeToReleaseNotes() {
      this.transitionTo('release-notes');
    },
  },
});
