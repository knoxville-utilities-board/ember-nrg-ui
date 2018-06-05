export const mobileBreakpoint = 320;
export const tabletBreakpoint = 768;
export const computerBreakpoint = 992;
export const largeMonitorBreakpoint = 1200;
export const widescreenMonitorBreakpoint = 1920;

export default {
  smallMobile: `(max-width: ${mobileBreakpoint - 1}px)`,
  mobile: `(min-width: ${mobileBreakpoint}px) and (max-width: ${tabletBreakpoint - 1}px)`,
  tablet: `(min-width: ${tabletBreakpoint}px) and (max-width: ${computerBreakpoint - 1}px)`,
  computer: `(min-width: ${computerBreakpoint}px) and (max-width: ${largeMonitorBreakpoint - 1}px)`,
  largeMonitor: `(min-width: ${largeMonitorBreakpoint}px) and (max-width: ${widescreenMonitorBreakpoint - 1}px)`,
  widescreenMonitor: `(min-width: ${widescreenMonitorBreakpoint}px)`
};
