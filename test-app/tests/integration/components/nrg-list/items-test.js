import { click, findAll, render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('Integration | Component | nrg-list/items', function (hooks) {
  setupRenderingTest(hooks);

  test('renders item implicitly', async function (assert) {
    this.items = [
      {
        header: 'Header',
        meta: 'Meta',
        id: 'id',
      },
    ];
    await render(hbs`<NrgList::Items @items={{this.items}} />`);

    assert.dom('.header').containsText('Header');
    assert.dom('.meta > span').containsText('Meta');
  });

  test('can click on item', async function (assert) {
    assert.expect(2);
    let selected;
    const item = {
      label: 'label',
    };
    this.items = [item];
    this.selectAction = function (selectedItem, allSelected) {
      assert.deepEqual(selectedItem, item);
      selected = allSelected;
    };
    this.isSelectable = function () {
      return true;
    };
    await render(
      hbs`<NrgList::Items @selectionType="single" @items={{this.items}} @isSelectable={{this.isSelectable}} @onItemSelect={{this.selectAction}} />`
    );
    await click('.item');
    assert.strictEqual(selected.length, 1);
  });

  test('can not select if isSelectable returns false', async function (assert) {
    assert.expect(2);
    let selected;
    const item1 = {
      label: 'label1',
    };
    const item2 = {
      label: 'label2',
    };
    this.items = [item1, item2];
    this.selectAction = function (selectedItem, allSelected) {
      assert.deepEqual(selectedItem, item2);
      selected = allSelected;
    };
    this.isSelectable = function (item) {
      return item.label !== 'label1';
    };
    await render(
      hbs`<NrgList::Items @isSelectable={{this.isSelectable}} @selectionType="multiple" @items={{this.items}} @onItemSelect={{this.selectAction}} />`
    );

    const items = findAll('.item');
    await click(items[0]);
    await click(items[1]);
    assert.strictEqual(selected.length, 1);
  });
});
