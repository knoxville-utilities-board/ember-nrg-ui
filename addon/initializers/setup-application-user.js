export function initialize(application) {
  application.inject('route', 'applicationUser', 'user:application');
  application.inject('controller', 'applicationUser', 'user:application');
  application.inject('component', 'applicationUser', 'user:application');
  application.inject('service', 'applicationUser', 'user:application');
  application.inject('authenticator', 'applicationUser', 'user:application');
}

export default {
  initialize
};
