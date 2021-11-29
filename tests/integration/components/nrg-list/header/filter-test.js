import { click, find, render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('Integration | Component | nrg-list/header/filter', function (hooks) {
  setupRenderingTest(hooks);

  test('action fires when value changes', async function (assert) {
    assert.expect(1);
    const filterValue = {
      label: 'label',
    };
    this.filterList = [filterValue];

    this.changedAction = function (filterParam, selectedFilterValue) {
      assert.equal(selectedFilterValue, filterValue);
    };

    await render(
      hbs`<NrgList::Header::Filter @filterParam="param" @filters={{filterList}} @onChange={{action changedAction}} />`
    );

    const dropdown = find('.ui.dropdown');
    await click(dropdown);
    await click(dropdown.querySelector('.item'));
  });
});
