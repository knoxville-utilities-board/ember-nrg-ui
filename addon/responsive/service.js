import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { or, readOnly } from '@ember/object/computed';

export default Service.extend({
  _isMobileService: service('isMobile'),

  _mediaService: service('media'),

  resizeService: service('resize'),

  init() {
    this._super(...arguments);
    this.get('resizeService').on('didResize', this, this._handleResizeEvent);
    this._handleResizeEvent();
  },

  _handleResizeEvent() {
    const { innerWidth, innerHeight } = window;
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

  isSmallMobileScreen: readOnly('_mediaService.isSmallMobile'),

  isMobileScreen: readOnly('_mediaService.isMobile'),

  isTabletScreen: readOnly('_mediaService.isTablet'),

  isComputerScreen: readOnly('_mediaService.isComputer'),

  isLargeMonitor: readOnly('_mediaService.isLargeMonitor'),

  isWidescreenMonitor: readOnly('_mediaService.isWidescreenMonitor'),

  /* Media Query Computed Groups */

  isMobileScreenGroup: or('isSmallMobileScreen', 'isMobileScreen', 'isTabletScreen'),

  isComputerScreenGroup: or('isComputerScreen', 'isLargeMonitor', 'isWidescreenMonitor'),
});

const mobileBreakpoint = 320;	
const tabletBreakpoint = 768;	
const computerBreakpoint = 992;	
const largeMonitorBreakpoint = 1200;	
const widescreenMonitorBreakpoint = 1920;

export {
  mobileBreakpoint,
  tabletBreakpoint,
  computerBreakpoint,
  largeMonitorBreakpoint,
  widescreenMonitorBreakpoint,
}