import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('Integration | Component | nrg-text-field', function (hooks) {
  setupRenderingTest(hooks);

  test('use like a regular text field with bound value', async function (assert) {
    this.set('value', 'bob');

    await render(hbs`<NrgTextField @value={{this.value}} />`);

    assert.dom('input').hasValue('bob');
  });
});
