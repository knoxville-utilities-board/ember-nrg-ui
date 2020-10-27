import Service from '@ember/service';
import { task } from 'ember-concurrency';

export default Service.extend({
  headerText: "What's New",
  primaryButtonText: "Dismiss",
  secondaryButtonText: '',

  getContent: task(function*() {
    // Implemented by user
  }),

  onModalClose() {
    // Implemented by user
  },

  onButtonClick() {
    // Implemented by user
  },

  onSecondaryClick() {
    // Implemented by user
  }
});
