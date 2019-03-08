import { initialize } from 'dummy/initializers/setup-application-user';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Initializer | setup-application-user', function(hooks) {
  setupTest(hooks);

  test('it works', async function(assert) {
    assert.expect(10);
    const application = {
      inject(type, name, factory) {
        assert.equal(name, 'applicationUser');
        assert.equal(factory, 'user:application');
      },
    };
    initialize(application);
  });
});
