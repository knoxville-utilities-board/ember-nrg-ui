import { A } from '@ember/array';
import { click, findAll, render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('Integration | Component | nrg-list/items', function(hooks) {
  setupRenderingTest(hooks);

  test('can click on item', async function(assert) {
    const item = {
      label: 'label',
    };
    this.items = [item];
    this.selected = A([]);
    this.selectAction = function(selectedItem) {
      assert.equal(selectedItem, item);
    };
    this.isSelectable = function() {
      return true;
    };
    await render(
      hbs`{{nrg-list/items isSelectable=isSelectable selectionType='single' selected=selected items=items itemClicked=(action selectAction)}}`
    );
    await click('.item');
    assert.equal(this.selected.length, 1);
  });

  test('can not select if isSelectable returns false', async function(assert) {
    const item1 = {
      label: 'label1',
    };
    const item2 = {
      label: 'label2',
    };
    this.selected = A([]);
    this.items = [item1, item2];
    this.selectAction = function(selectedItem) {
      assert.equal(selectedItem, item2);
    };
    this.isSelectable = function(item) {
      return item.label !== 'label1';
    };
    await render(
      hbs`{{nrg-list/items isSelectable=isSelectable selectionType='multiple' selected=selected items=items itemClicked=(action selectAction)}}`
    );

    const items = findAll('.item');
    await click(items[0]);
    await click(items[1]);
    assert.equal(this.selected.length, 1);
  });
});
