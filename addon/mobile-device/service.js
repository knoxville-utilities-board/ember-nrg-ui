import Service from '@ember/service';
import { computed } from '@ember/object';
import { or } from '@ember/object/computed';

export default Service.extend({
  isIOS: computed(function() {
    return document.querySelector('html').classList.contains('ios-device');
  }),
  isAndroid: computed(function() {
    return document.querySelector('html').classList.contains('android-device');
  }),
  isMobileDevice: or('isIOS', 'isAndroid'),
});
