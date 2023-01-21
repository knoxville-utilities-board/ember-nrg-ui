import { click, find, render } from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';
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
      assert.deepEqual(selectedFilterValue, filterValue);
    };

    await render(
      hbs`<NrgList::Header::Filter @filterParam="param" @filters={{this.filterList}} @onChange={{this.changedAction}} />`
    );

    const dropdown = find('.ui.dropdown');
    await click(dropdown);
    await click(dropdown.querySelector('.item'));
  });

  test('value updates when action fires', async function (assert) {
    class Model {
      @tracked
      value;
    }
    this.model = new Model();

    const filterValue = {
      label: 'label',
    };
    this.filterList = [filterValue];

    await render(
      hbs`<NrgList::Header::Filter @filters={{this.filterList}} @model={{this}} @valuePath="model.value" />`
    );

    const dropdown = find('.ui.dropdown');
    await click(dropdown);
    await click(dropdown.querySelector('.item'));

    assert.deepEqual(this.model.value, filterValue);
    assert.dom('.text', dropdown).containsText('label');
  });
});
