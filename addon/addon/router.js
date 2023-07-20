export default function (router) {
  router.route('release-notes');
  router.route('not-found', {
    path: '/*path',
  });
}
