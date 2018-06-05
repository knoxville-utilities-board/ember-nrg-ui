import Mixin from '@ember/object/mixin';

export default Mixin.create({
  didValidate: false,

  showValidation() {
    this.set('didValidate', true);
  },

  hideValidation() {
    this.set('didValidate', false);
  },
});
