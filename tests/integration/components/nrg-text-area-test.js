import { fillIn, render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('Integration | Component | nrg-text-area', function (hooks) {
  setupRenderingTest(hooks);

  test('use like a regular text area with bound value', async function (assert) {
    this.set('valuePath', 'bob');

    await render(hbs`<NrgTextArea @model={{this}} @valuePath="valuePath" />`);

    assert.dom('textarea').hasValue('bob');
  });

  test('values from a model are used', async function (assert) {
    this.set('model', {
      value: 'bob',
    });

    await render(hbs`<NrgTextArea @model={{this.model}} @valuePath="value" />`);

    assert.dom('textarea').hasValue('bob');

    await fillIn('textarea', 'text');

    assert.strictEqual(this.model.value, 'text');
  });
});
