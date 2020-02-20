import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from './template';
import { task, timeout } from 'ember-concurrency';

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
  tagName: 'span',
  position: 'top',
  isOpen: false,
  hoverTimeout: 250,

  target: computed(function() {
    return this.element.querySelector('.popup-anchor');
  }),
  targetAttachment: computed('position', function() {
    return TARGET_POSITIONS[this.position];
  }),
  popupAttachment: computed('position', function() {
    return POPUP_POSITIONS[this.position];
  }),

  mouseEnter() {
    this.onMouseEnter();
  },
  mouseLeave() {
    this.onMouseLeave();
  },

  onMouseEnter() {
    this.hoverTask.perform(true);
  },
  onMouseLeave() {
    this.hoverTask.perform(false);
  },

  hoverTask: task(function*(hovering) {
    yield timeout(this.hoverTimeout);
    this.set('isOpen', hovering);
  }).restartable(),
});
