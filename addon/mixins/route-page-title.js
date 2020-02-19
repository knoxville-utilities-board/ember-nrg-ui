import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';

export default Mixin.create({
  applicationService: service('application'),

  pageTitle: '',

  actions: {
    didTransition() {
      this._super(...arguments);
      if (this.pageTitle) {
        this.set('applicationService.pageTitle', this.pageTitle);
      }
    },
  },
});
