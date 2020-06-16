import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | nrg-list/header/search', function(hooks) {
  setupRenderingTest(hooks);

  test('action fires when value changes', async function(assert) {
    this.changedAction = function(value) {
      assert.equal(value, 'value');
    };
    await render(hbs`<NrgList::Header::Search @searchString="value" @changed={{action changedAction}} />`);
  });
});
