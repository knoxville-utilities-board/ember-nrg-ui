import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | responsive', function(hooks) {
  setupTest(hooks);

  test('is mobile device evaulates correctly', function(assert) {
    const service = this.owner.lookup('service:responsive');
    assert.false(service.get('isMobileDevice'));
  });
});
