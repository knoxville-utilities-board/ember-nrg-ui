import Route from '@ember/routing/route';
import SidebarNavigationMixin from 'ember-nrg-ui/mixins/sidebar-navigation';

export default Route.extend(SidebarNavigationMixin, {
  sidebarLabel: 'nrg-lightbox',

  model() {
    return {
      photos: [
        {
          url: 'https://picsum.photos/400/400',
          detail: 'Some details about the first photo\n',
        },
        {
          url: 'https://picsum.photos/100/100',
          detail: 'Some details about the second photo\n',
        },
        {
          url: 'https://picsum.photos/2448/3264',
          detail: 'Some details about the third photo\n',
        },
      ],
      videos: [
        {
          url: 'http://techslides.com/demos/samples/sample.webm',
          detail: 'Some details about the first video\n',
        }, 
        {
          url: 'http://techslides.com/demos/samples/sample.mp4',
          detail: 'Some details about the second video\n',
        },
      ],
    }
  },
});
