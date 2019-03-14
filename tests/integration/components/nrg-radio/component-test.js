import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | nrg-radio', function(hooks) {
  setupRenderingTest(hooks);

  test('it becomes checked when its value is selected', async function(assert) {
    await render(hbs`{{nrg-radio value='1' selectedValue='1'}}`);

    assert.ok(this.$('.checked').length);
  });
});
