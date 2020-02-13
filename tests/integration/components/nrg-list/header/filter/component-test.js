import { click, find, render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('Integration | Component | nrg-list/header/filter', function(hooks) {
  setupRenderingTest(hooks);

  test('action fires when value changes', async function(assert) {
    const filterValue = {
      label: 'label',
    };
    this.filterList = [filterValue];

    this.changedAction = function(filterParam, selectedFilterValue) {
      assert.equal(selectedFilterValue, filterValue);
    };

    await render(
      hbs`{{nrg-list/header/filter filterParam='param' filters=filterList changed=(action changedAction)}}`
    );

    const dropdown = find('.ui.dropdown');
    await click(dropdown);
    await click(dropdown.querySelector('.item'));
  });
});
