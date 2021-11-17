import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return [
      {
        url: 'https://www.fillmurray.com/400/400',
        detail: 'Some details about the first photo\n',
      },
      {
        url: 'https://www.fillmurray.com/100/100',
        detail: 'Some details about the second photo\n',
      },
      {
        url: 'https://www.fillmurray.com/2448/3264',
        detail: 'Some details about the third photo\n',
      },
    ];
  },
});
