import Controller from '@ember/controller';

export default Controller.extend({
  onBackArrowClick() {
    this.transitionToRoute('master-detail');
  },
});
