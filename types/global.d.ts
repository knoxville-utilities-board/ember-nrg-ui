// Types for compiled templates
declare module 'ember-nrg-ui/templates/*' {
  import { TemplateFactory } from 'ember-cli-htmlbars';

  const tmpl: TemplateFactory;
  export default tmpl;
}

// ember-cli-app-version does not provide types
declare module 'ember-cli-app-version/utils/regexp' {
  export const shaRegExp: RegExp;
  export const versionExtendedRegExp: RegExp;
  export const versionRegExp: RegExp;
}

declare interface IsMobileService {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;

  apple?: {
    phone: boolean;
    ipod: boolean;
    tablet: boolean;
    device: boolean;
  };

  android?: {
    phone: boolean;
    tablet: boolean;
    device: boolean;
  };
}

declare interface MediaService {
  isSmallMobile: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isComputer: boolean;
  isLargeMonitor: boolean;
  isWidescreenMonitor: boolean;
}

declare interface PageTitleService {
  titleDidUpdate: (title: string) => void;
}

declare type NrgModalType =
  | 'flyout'
  | 'lightbox'
  | 'sidebar'
  | 'takeover'
  | 'modal';

declare interface NrgModalArgs {
  isOpen: boolean;

  onPrimaryButtonClick: () => unknown;
  onSecondaryButtonClick: () => unknown;
  onDismiss: () => unknown;
}

declare interface NrgModal {
  args: NrgModalArgs;

  renderTo: HTMLElement | null;
  isHidden: boolean;
  hasButtons: boolean;
  isTesting: boolean;
  dismissable: boolean;
  basic: boolean;
  sidebar: boolean;
  lightbox: boolean;
  flyout: boolean;
  stackable: boolean;
  position: string; // TODO add restrictions
  type: NrgModalType;
  dimmerType: 'light' | 'dark';
  scrolling: boolean;
  modalClass: string;
  dimmerClass: string;
  headerText: string;
  priority: number;
  renderInPlace: boolean;
  renderInModal: boolean;
  shouldWormhole: boolean;
  primaryButton?: string;
  secondaryButton?: string;
  hidden: boolean;
  takeover: boolean;
  secondaryButtonClass: string;
  renderIndex: number;

  onHide: () => unknown;
}
