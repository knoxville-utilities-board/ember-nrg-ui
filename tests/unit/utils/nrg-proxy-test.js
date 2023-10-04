import { tracked } from '@glimmer/tracking';
import NrgProxy from 'ember-nrg-ui/utils/nrg-proxy';
import { module, test } from 'qunit';

class Test {
  @tracked
  foo = 'bar';
}

module('Unit | Utility | nrg-proxy', function () {
  test('it works', function (assert) {
    const proxy = new NrgProxy();

    assert.notOk(proxy.foo);

    proxy.foo = 'baz';
    assert.strictEqual(proxy.foo, 'baz');

    proxy.content = new Test();
    assert.strictEqual(proxy.foo, 'bar');

    proxy.foo = 'baz';
    assert.strictEqual(proxy.foo, 'baz');
    assert.strictEqual(proxy.content.foo, 'baz');

    proxy.content = new Test();
    assert.strictEqual(proxy.foo, 'bar');
    assert.strictEqual(proxy.content.foo, 'bar');
  });
});
