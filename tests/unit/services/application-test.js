import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | application', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const service = this.owner.lookup('service:application');
    assert.ok(service);
  });
});
