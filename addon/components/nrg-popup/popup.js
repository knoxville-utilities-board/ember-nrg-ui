import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../../templates/components/nrg-popup/popup';

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

export default Component.extend({
  layout,
  tagName: '',

  position: 'top',
  targetAttachment: computed('position', function() {
    return TARGET_POSITIONS[this.position];
  }),
  popupAttachment: computed('position', function() {
    return POPUP_POSITIONS[this.position];
  }),

  popupClass: '',
  _popupClass: computed('targetAttachment', 'inverted', 'popupClass', function() {
    let appliedClass = '';
    if (this.targetAttachment) {
      appliedClass += this.targetAttachment.replace('middle', 'center');
    }
    if (this.inverted) {
      appliedClass += ' inverted';
    }
    if (this.popupClass) {
      appliedClass += ` ${this.popupClass}`;
    }
    return appliedClass;
  }),

  popupContainer: computed(function() {
    return document.querySelector('#popup-container');
  }),

  onMouseEnter() {
    // implement
  },
  onMouseLeave() {
    // implement
  },
});
