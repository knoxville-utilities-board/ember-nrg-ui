import { getOwner } from '@ember/application';
import { computed } from '@ember/object';
import Service from '@ember/service';

export default Service.extend({
  isTesting: computed(function() {
    const config = getOwner(this).resolveRegistration('config:environment');
    return config.environment === 'test';
  }),
  pageTitle: '',
});
