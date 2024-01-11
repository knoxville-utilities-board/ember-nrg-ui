import { action } from '@ember/object';
import Component from '@glimmer/component';
import { AddNrgDeprecations } from '../../utils/deprecation-handler';

@AddNrgDeprecations()
export default class NrgListDefaultListItemComponent extends Component {
  @action
  openLink(link, openLinkInNewWindow, evt) {
    if (!link) {
      return;
    }
    evt.preventDefault();
    evt.stopPropagation();
    if (openLinkInNewWindow) {
      const newWindow = window.open();
      newWindow.opener = null;
      newWindow.location = link;
    } else {
      window.location = link;
    }
  }
}
