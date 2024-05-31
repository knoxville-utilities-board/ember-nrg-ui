import Service, { inject as service } from '@ember/service';
import type { IsMobileService, MediaService } from 'global';

export default class Responsive extends Service {
  @service
  declare isMobile: IsMobileService;

  @service
  declare media: MediaService;

  get screenWidth() {
    return window.innerWidth;
  }

  get screenHeight() {
    return window.innerHeight;
  }

  /* Mobile Device Checks */

  get isIOS() {
    return this.isMobile?.apple?.device;
  }

  get isAndroid() {
    return this.isMobile?.android?.device;
  }

  get isMobileDevice() {
    return this.isIOS || this.isAndroid;
  }

  /* Media Query Breakpoints */

  get isSmallMobileScreen() {
    return this.media?.isSmallMobile;
  }

  get isMobileScreen() {
    return this.media?.isMobile;
  }

  get isTabletScreen() {
    return this.media?.isTablet;
  }

  get isComputerScreen() {
    return this.media?.isComputer;
  }

  get isLargeMonitor() {
    return this.media?.isLargeMonitor;
  }

  get isWidescreenMonitor() {
    return this.media?.isWidescreenMonitor;
  }

  /* Media Query Computed Groups */

  get isMobileScreenGroup() {
    return (
      this.isSmallMobileScreen || this.isMobileScreen || this.isTabletScreen
    );
  }

  get isComputerScreenGroup() {
    return (
      this.isComputerScreen || this.isLargeMonitor || this.isWidescreenMonitor
    );
  }
}
