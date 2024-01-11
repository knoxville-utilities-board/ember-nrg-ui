import breakpoints from '../breakpoints';

export function initialize(application) {
  application.unregister('breakpoints:main');
  application.register('breakpoints:main', breakpoints);
}

export default {
  initialize,
};
