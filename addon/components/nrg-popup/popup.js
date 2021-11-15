import Component from '@glimmer/component';

const TARGET_POSITIONS = {
  top: 'top left',
  bottom: 'bottom left',
  left: 'middle left',
  right: 'middle right',
};

const POPUP_POSITIONS = {
  top: 'bottom left',
  bottom: 'top left',
  left: 'middle right',
  right: 'middle left',
};

export default class NrgPopupPopupComponent extends Component {
  get targetAttachment() {
    const position = this.args.position ?? 'top';
    return TARGET_POSITIONS[position];
  }

  get popupAttachment() {
    const position = this.args.position ?? 'top';
    return POPUP_POSITIONS[position];
  }

  get targetAttachmentClass() {
    if (this.targetAttachment) {
      return this.targetAttachment.replace('middle', 'center');
    } else {
      return '';
    }
  }

  get popupContainer() {
    return document.querySelector('#popup-container');
  }
}
