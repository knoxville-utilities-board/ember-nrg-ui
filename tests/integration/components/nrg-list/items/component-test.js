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
import {
  A,
} from '@ember/array';
import hbs from 'htmlbars-inline-precompile';

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
    }
    await render(hbs `{{nrg-list/items isSelectable=isSelectable selectionType='single' selected=selected items=items itemClicked=(action selectAction)}}`);
    this.$('.item').click();
    assert.equal(this.selected.length, 1);
  });

  test('can not select if isSelectable returns false', async function(assert) {
    const item1 = {
      label: 'label1',
    };
    const item2 = {
      label: 'label2'
    }
    this.selected = A([]);
    this.items = [item1, item2];
    this.selectAction = function(selectedItem) {
      assert.equal(selectedItem, item2);
    };

    this.isSelectable = function(item) {
      if (item.label == 'label1') {
        return false;
      } else return true;
    }
    await render(hbs `{{nrg-list/items isSelectable=isSelectable selectionType='multiple' selected=selected items=items itemClicked=(action selectAction)}}`);
    this.$('.item').eq(0).click();
    this.$('.item').eq(1).click();
    assert.equal(this.selected.length, 1);
  });

});
