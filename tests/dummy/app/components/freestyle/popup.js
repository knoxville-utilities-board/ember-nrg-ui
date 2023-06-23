import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class FreestyleNrgPopupComponent extends Component {
  @tracked
  popupContent = 'Popup content example';

  popupPositionOptions = ['', 'left', 'right', 'bottom'];
}
