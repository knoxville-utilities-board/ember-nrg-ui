import Service from '@ember/service';
import {
  inject as service
} from '@ember/service';
import {
  or,
  readOnly
} from '@ember/object/computed';

export default Service.extend({
  _isMobileService: service('isMobile'),

  _mediaService: service('media'),

  resizeService: service('resize'),

  init() {
    this.get('resizeService').on('didResize', this, this._handleResizeEvent);
    this._handleResizeEvent();
  },

  _handleResizeEvent() {
    const {
      innerWidth,
      innerHeight
    } = window;
    this.setProperties({
      screenWidth: innerWidth,
      screenHeight: innerHeight,
    });
  },

  screenWidth: window.innerWidth,

  screenHeight: window.innerHeight,

  /* Mobile Device Checks */

  isIOS: readOnly('_isMobileService.apple.device'),

  isAndroid: readOnly('_isMobileService.android.device'),

  isMobileDevice: or('isIOS', 'isAndroid'),

  /* Media Query Breakpoints */

  isSmallMobileScreen: readOnly('_mediaService.smallMobile.matches'),

  isMobileScreen: readOnly('_mediaService.mobile.matches'),

  isTabletScreen: readOnly('_mediaService.tablet.matches'),

  isComputerScreen: readOnly('_mediaService.computer.matches'),

  isLargeMonitor: readOnly('_mediaService.largeMonitor.matches'),

  isWidescreenMonitor: readOnly('_mediaService.widescreenMonitor.matches'),
});
