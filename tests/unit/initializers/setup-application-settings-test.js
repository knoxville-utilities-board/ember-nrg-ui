import {
  initialize
} from 'dummy/initializers/setup-application-settings';
import {
  module,
  test
} from 'qunit';
import {
  setupTest
} from 'ember-qunit';

module('Unit | Initializer | setup-application-settings', function(hooks) {
  setupTest(hooks);

  test('it works', async function(assert) {
    assert.expect(10);
    const application = {
      inject(type, name, factory) {
        assert.equal(name, 'applicationSettings');
        assert.equal(factory, 'settings:application');
      },
    };
    initialize(application);
  });
});
