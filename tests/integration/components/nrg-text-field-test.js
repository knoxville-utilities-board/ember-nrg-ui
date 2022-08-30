import { fillIn, render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('Integration | Component | nrg-text-field', function (hooks) {
  setupRenderingTest(hooks);

  test('use like a regular text field with bound value', async function (assert) {
    this.set('name', 'bob');

    await render(hbs`<NrgTextField @model={{this}} @valuePath="name" />`);

    assert.dom('input').hasValue('bob');
  });

  test("can update text field's value", async function (assert) {
    this.set('name', 'bob');

    await render(hbs`<NrgTextField @model={{this}} @valuePath="name" />`);

    await fillIn('input', 'lorem');

    assert.dom('input').hasValue('lorem');
  });

  test('disabling two way binding prevents updates', async function (assert) {
    this.set('name', 'bob');

    await render(
      hbs`<NrgTextField @model={{this}} @valuePath="name" @twoWayBinding={{false}} />`
    );

    await fillIn('input', 'lorem');

    assert.dom('input').hasValue('bob');
  });
});
