export function initialize(application) {
  application.inject('route', 'applicationSettings', 'settings:application');
  application.inject(
    'controller',
    'applicationSettings',
    'settings:application'
  );
  application.inject(
    'component',
    'applicationSettings',
    'settings:application'
  );
  application.inject('service', 'applicationSettings', 'settings:application');
  application.inject(
    'authenticator',
    'applicationSettings',
    'settings:application'
  );
}

export default {
  initialize,
};
