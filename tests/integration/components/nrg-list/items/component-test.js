import { click, findAll, render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('Integration | Component | nrg-list/items', function (hooks) {
  setupRenderingTest(hooks);

  test('can click on item', async function (assert) {
    assert.expect(2);
    const item = {
      label: 'label',
    };
    this.items = [item];
    this.selectAction = function (selectedItem, allSelected) {
      assert.equal(selectedItem, item);
      this.selected = allSelected;
    };
    this.isSelectable = function () {
      return true;
    };
    await render(
      hbs`<NrgList::Items @selectionType="single" @items={{items}} @isSelectable={{action isSelectable}} @onItemSelect={{action selectAction}} />`
    );
    await click('.item');
    assert.equal(this.selected.length, 1);
  });

  test('can not select if isSelectable returns false', async function (assert) {
    assert.expect(2);
    const item1 = {
      label: 'label1',
    };
    const item2 = {
      label: 'label2',
    };
    this.items = [item1, item2];
    this.selectAction = function (selectedItem, allSelected) {
      assert.equal(selectedItem, item2);
      this.selected = allSelected;
    };
    this.isSelectable = function (item) {
      return item.label !== 'label1';
    };
    await render(
      hbs`<NrgList::Items @isSelectable={{isSelectable}} @selectionType="multiple" @items={{items}} @onItemSelect={{action selectAction}} />`
    );

    const items = findAll('.item');
    await click(items[0]);
    await click(items[1]);
    assert.equal(this.selected.length, 1);
  });
});
