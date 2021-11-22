import Application from '@ember/application';

import { initialize } from 'dummy/instance-initializers/breakpoints-override';
import { module, test } from 'qunit';
import Resolver from 'ember-resolver';
import { run } from '@ember/runloop';

module('Unit | Instance Initializer | breakpoints-override', function(hooks) {
  hooks.beforeEach(function() {
    this.TestApplication = class TestApplication extends Application {}
    this.TestApplication.instanceInitializer({
      name: 'initializer under test',
      initialize
    });
    this.application = this.TestApplication.create({ autoboot: false, Resolver });
    this.instance = this.application.buildInstance();
  });
  hooks.afterEach(function() {
    run(this.instance, 'destroy');
    run(this.application, 'destroy');
  });

  test('breakpoints:main contains custom breakpoints', async function(assert) {
    await this.instance.boot();
    const breakpoints = this.instance.resolveRegistration('breakpoints:main');

    assert.ok(breakpoints.smallMobile);
    assert.ok(breakpoints.mobile);
    assert.ok(breakpoints.tablet);
    assert.ok(breakpoints.computer);
    assert.ok(breakpoints.largeMonitor);
    assert.ok(breakpoints.widescreenMonitor);

    assert.notOk(breakpoints.desktop);
    assert.notOk(breakpoints.jumbo);
  });
});
