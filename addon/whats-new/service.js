import Service from '@ember/service';

export default Service.extend({
  headerText: "What's New",
  primaryButtonText: "Dismiss",
  secondaryButtonText: '',

  getContent() {
    // Implemented by user
  },

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