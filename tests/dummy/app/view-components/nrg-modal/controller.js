import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    forceDismiss() {
      this.set('modalOpen5', false);
      this.set('modalOpen6', false);
    },
  },
});
