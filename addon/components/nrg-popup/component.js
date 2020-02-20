import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from './template';
import { task, timeout } from 'ember-concurrency';

export default Component.extend({
  layout,
  tagName: 'span',
  isOpen: false,
  hoverTimeout: 250,

  target: computed(function() {
    return this.element.querySelector('.popup-anchor');
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
