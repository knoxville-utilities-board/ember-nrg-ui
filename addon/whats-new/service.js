import Service from '@ember/service';
import { bool, reads } from '@ember/object/computed';

export default Service.extend({
  headerText: "What's New",
  primaryButtonText: "Dismiss",
  secondaryButtonText: '',

  hasContent: bool('content'),
  isOpen: reads('hasContent'),

  onModalClose() {
    // Implemented by user
  },

  onPrimaryClick() {
    // Implemented by user
  },

  onSecondaryClick() {
    // Implemented by user
  }
});
