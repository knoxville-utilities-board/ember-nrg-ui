import { findAll, render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('Integration | Component | nrg-radio', function(hooks) {
  setupRenderingTest(hooks);

  test('it becomes checked when its value is selected', async function(assert) {
    await render(hbs`{{nrg-radio value='1' selectedValue='1'}}`);

    assert.ok(findAll('.checked').length);
  });
});
