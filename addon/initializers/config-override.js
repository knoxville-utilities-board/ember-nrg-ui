export function initialize(application) {
  const config = application.resolveRegistration('config:environment');
  if (!config.flashMessageDefaults) {
    config.flashMessageDefaults = {
      timeout: 7000,
      type: 'info',
      types: ['success', 'error', 'info', 'warning'],
      showProgress: true,
    };
  }
  if (!config.moment) {
    config.moment = {
      allowEmpty: true,
      includeTimezone: 'all',
    };
  }
}

export default {
  initialize,
};
