import {
  module,
  test
} from 'qunit';
import {
  setupRenderingTest
} from 'ember-qunit';
import {
  render
} from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import $ from 'jquery';

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

    await render(hbs `{{nrg-list/header/filter filterParam='param' filters=filterList changed=(action changedAction)}}`);

    const dropdown = $('.ui.dropdown').eq(0);
    dropdown.click();
    $('.item', dropdown).eq(0).click();
  });
});
