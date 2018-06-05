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

module('Integration | Component | nrg-list', function(hooks) {
  setupRenderingTest(hooks);

  test('can click on item', async function(assert) {
    const item = {
      label: 'label',
    };
    this.items = [item];
    this.selectAction = function(selectedItem) {
      assert.equal(selectedItem, item);
    };
    await render(hbs `{{nrg-list selectionType='single' items=items select=(action selectAction)}}`);
    this.$('.item').click();
  });
});
