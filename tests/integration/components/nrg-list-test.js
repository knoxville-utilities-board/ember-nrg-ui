import { click, render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('Integration | Component | nrg-list', function (hooks) {
  setupRenderingTest(hooks);

  test('can click on item', async function (assert) {
    assert.expect(1);
    const item = {
      label: 'label',
    };
    this.items = [item];
    this.selectAction = function (selectedItem) {
      assert.deepEqual(selectedItem, item);
    };
    await render(
      hbs`<NrgList @selectionType="single" @items={{this.items}} @onChange={{this.selectAction}} />`
    );
    await click('.item');
  });
});
