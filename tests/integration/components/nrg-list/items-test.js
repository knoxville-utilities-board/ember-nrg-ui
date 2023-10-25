import { click, findAll, render } from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

class Model {
  @tracked
  value;
}

module('Integration | Component | nrg-list/items', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.model = new Model();
  });

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
    assert.expect(1);
    const item = {
      header: 'header',
    };
    this.items = [item];
    this.clickAction = function (selectedItem) {
      assert.deepEqual(selectedItem, item);
    };

    await render(
      hbs`<NrgList::Items @selectionType="click" @items={{this.items}} @onItemClick={{this.clickAction}} />`
    );

    await click('.item');
  });

  test('can select an item', async function (assert) {
    assert.expect(1);
    const item = {
      header: 'header',
    };
    this.items = [item];
    this.selectAction = function (selectedItem) {
      assert.deepEqual(selectedItem, item);
    };
    await render(
      hbs`<NrgList::Items @selectionType="single" @items={{this.items}} @onChange={{this.selectAction}} />`
    );
    await click('.item');
  });

  test('can select an item with model/valuePath', async function (assert) {
    assert.expect(2);
    const item = {
      header: 'header',
    };
    this.items = [item];
    this.selectAction = function (selectedItem) {
      assert.deepEqual(selectedItem, item);
    };

    await render(
      hbs`<NrgList::Items @selectionType="single" @items={{this.items}} @model={{this.model}} @valuePath="value" @onChange={{this.selectAction}} />`
    );

    await click('.item');

    assert.deepEqual(this.model.value, item);
  });

  test('can select multiple items', async function (assert) {
    assert.expect(6);
    const item = {
      header: 'header',
    };
    const item2 = {
      header: 'header2',
    };
    this.items = [item, item2];
    let expectedArray, expectedItem;
    this.selectAction = function (allSelected, selectedItem) {
      assert.deepEqual(allSelected, expectedArray);
      assert.deepEqual(selectedItem, expectedItem);
    };

    await render(
      hbs`<NrgList::Items @selectionType="multiple" @items={{this.items}} @onChange={{this.selectAction}} />`
    );

    expectedArray = [item];
    expectedItem = item;
    await click('.item');

    expectedArray = [item, item2];
    expectedItem = item2;
    await click('.item:nth-child(2)');

    expectedArray = [item2];
    expectedItem = item;
    await click('.item');
  });

  test('can select multiple items with model/valuePath', async function (assert) {
    assert.expect(9);
    const item = {
      header: 'header',
    };
    const item2 = {
      header: 'header2',
    };
    this.items = [item, item2];
    let expectedArray, expectedItem;
    this.selectAction = function (allSelected, selectedItem) {
      assert.deepEqual(allSelected, expectedArray);
      assert.deepEqual(selectedItem, expectedItem);

      assert.deepEqual(this.model.value, expectedArray);
    };

    await render(
      hbs`
        <NrgList::Items
          @selectionType="multiple"
          @items={{this.items}}
          @model={{this.model}}
          @valuePath="value"
          @onChange={{this.selectAction}} />`
    );

    expectedArray = [item];
    expectedItem = item;
    await click('.item');

    expectedArray = [item, item2];
    expectedItem = item2;
    await click('.item:nth-child(2)');

    expectedArray = [item2];
    expectedItem = item;
    await click('.item');
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
    this.selectAction = function (allSelected, selectedItem) {
      assert.deepEqual(selectedItem, item2);
      selected = allSelected;
    };
    this.isSelectable = function (item) {
      return item.label !== 'label1';
    };
    await render(
      hbs`<NrgList::Items @isSelectable={{this.isSelectable}} @selectionType="multiple" @items={{this.items}} @onChange={{this.selectAction}} />`
    );

    const items = findAll('.item');
    await click(items[0]);
    await click(items[1]);
    assert.strictEqual(selected.length, 1);
  });
});
