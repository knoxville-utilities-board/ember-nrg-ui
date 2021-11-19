import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('Integration | Component | nrg-text-area', function (hooks) {
  setupRenderingTest(hooks);

  test('use like a regular text area with bound value', async function (assert) {
    this.set('value', 'bob');

    await render(hbs`<NrgTextArea @value={{value}} />`);

    assert.dom('textarea').hasValue('bob');
  });
});
