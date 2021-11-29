import { fillIn, render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('Integration | Component | nrg-list/header/search', function (hooks) {
  setupRenderingTest(hooks);

  test('action fires when value changes', async function (assert) {
    assert.expect(1);
    this.changedAction = function (value) {
      assert.equal(value, 'value');
    };
    await render(
      hbs`<NrgList::Header::Search @onChange={{action changedAction}} />`
    );
    await fillIn('input', 'value');
  });
});
