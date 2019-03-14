import { module, test } from 'qunit';
import { visit, find } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | resize', function(hooks) {
  setupApplicationTest(hooks);

  test('resize mixin exposes screen height and width', async function(assert) {
    const { innerWidth, innerHeight } = window;
    await visit('/view-mixins/resize');
    assert.equal(find('.js-screen-height').innerHTML, innerHeight);
    assert.equal(find('.js-screen-width').innerHTML, innerWidth);
  });
});
