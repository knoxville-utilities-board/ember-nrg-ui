import Component from '@ember/component';
import layout from '../../templates/components/nrg-list/default-list-item';
import { reads } from '@ember/object/computed';

export default Component.extend({
  layout,
  tagName: '',
  image: reads('item.image'),
  header: reads('item.header'),
  meta: reads('item.meta'),
  description: reads('item.description'),
  extra: reads('item.extra'),

  actions: {
    openLink(link, openLinkInNewWindow) {
      if (!link) {
        return;
      }
      if (openLinkInNewWindow) {
        const newWindow = window.open();
        newWindow.opener = null;
        newWindow.location = link;
      } else {
        window.location = link;
      }
    },
  },
});
