import Controller from '@ember/controller';

export default Controller.extend({
  onBackArrowClick() {
    this.transitionToRoute('master-detail');
  },
  actions: {
    forceDismiss() {
      this.set('modalOpen', false);
      this.set('modalOpen2', false);
    },
  },
});
