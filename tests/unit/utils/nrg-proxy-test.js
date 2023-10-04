import { tracked } from '@glimmer/tracking';
import NrgProxy from 'ember-nrg-ui/utils/nrg-proxy';
import { module, test } from 'qunit';

class Test {
  @tracked
  foo = 'bar';
}

module('Unit | Utility | nrg-proxy', function () {
  // TODO: Replace this with your real tests.
  test('it works', function (assert) {
    const proxy = new NrgProxy();
    assert.notOk(proxy.foo);

    proxy.setTarget(new Test());

    assert.strictEqual(proxy.foo, 'bar');
  });
});
