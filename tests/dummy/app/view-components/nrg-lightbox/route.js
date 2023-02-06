import Route from '@ember/routing/route';
import SidebarNavigationMixin from 'ember-nrg-ui/mixins/sidebar-navigation';

export default Route.extend(SidebarNavigationMixin, {
  sidebarLabel: 'nrg-lightbox',

  model() {
    return [
      {
        url: 'http://www.unsplash.it/g/400/400',
        detail: 'Some details about the first photo\n',
      },
      {
        url: 'http://www.unsplash.it/g/100/100',
        detail: 'Some details about the second photo\n',
      },
      {
        url: 'http://www.unsplash.it/g/2448/3264',
        detail: 'Some details about the third photo\n',
      },
    ];
  },
});
