import Application from '@ember/application';

import { initialize } from 'dummy/initializers/breakpoints-override';
import { module, test } from 'qunit';
import { run } from '@ember/runloop';

module('Unit | Initializer | breakpoints-override', function(hooks) {
  hooks.beforeEach(function() {
    this.TestApplication = Application.extend();
    this.TestApplication.initializer({
      name: 'initializer under test',
      initialize
    });

    this.application = this.TestApplication.create({ autoboot: false });
  });

  hooks.afterEach(function() {
    run(this.application, 'destroy');
  });

  test('breakpoints:main contains custom breakpoints', async function(assert) {
    await this.application.boot();
    const breakpoints = this.application.resolveRegistration('breakpoints:main');

    assert.ok(breakpoints);
    assert.ok(breakpoints.smallMobile);
    assert.ok(breakpoints.mobile);
    assert.ok(breakpoints.tablet);
    assert.ok(breakpoints.computer);
    assert.ok(breakpoints.largeMonitor);
    assert.ok(breakpoints.widescreenMonitor);
    assert.notOk(breakpoints.jumbo);
  });
});
