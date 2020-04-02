import breakpoints from 'ember-nrg-ui/breakpoints';

export function initialize(application) {
  application.unregister('breakpoints:main');
  application.register('breakpoints:main', breakpoints);
}

export default {
  initialize
};
