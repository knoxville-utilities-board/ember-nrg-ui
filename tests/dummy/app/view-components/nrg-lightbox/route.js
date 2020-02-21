import Route from '@ember/routing/route';
import SidebarNavigationMixin from 'ember-nrg-ui/mixins/sidebar-navigation';

export default Route.extend(SidebarNavigationMixin, {
  sidebarLabel: 'nrg-lightbox',

  model() {
    return [
      {
        url: 'https://www.fillmurray.com/400/400',
        detail: 'Some details about the first photo\n',
      },
      {
        url: 'https://www.fillmurray.com/100/100',
        detail: 'Some details about the second photo\n',
      },
      {
        url: 'https://www.fillmurray.com/1500/1500',
        detail: 'Some details about the third photo\n',
      },
    ];
  },
});
