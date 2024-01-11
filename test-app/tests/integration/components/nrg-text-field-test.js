import { fillIn, render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('Integration | Component | nrg-text-field', function (hooks) {
  setupRenderingTest(hooks);

  test('use like a regular text field with bound value', async function (assert) {
    this.set('value', 'bob');

    await render(hbs`<NrgTextField @model={{this}} @valuePath="value" />`);

    assert.dom('input').hasValue('bob');
  });

  test("number fields don't allow non-numeric characters", async function (assert) {
    await render(
      hbs`<NrgTextField @model={{this}} @valuePath="value" @type="number" />`
    );

    await fillIn('input', 'bob');

    assert.dom('input').hasValue('0');
    assert.strictEqual(this.value, 0);
  });

  test('number fields allow numeric characters', async function (assert) {
    await render(
      hbs`<NrgTextField @model={{this}} @valuePath="value" @type="number" />`
    );

    await fillIn('input', '123');

    assert.dom('input').hasValue('123');
    assert.strictEqual(this.value, 123);
  });

  test('number fields allow decimal characters', async function (assert) {
    await render(
      hbs`<NrgTextField @model={{this}} @valuePath="value" @type="number" @allowDecimals={{true}} />`
    );

    await fillIn('input', '123.45');

    assert.dom('input').hasValue('123.45');
    assert.strictEqual(this.value, 123.45);
  });

  test('number fields do not allow decimal characters', async function (assert) {
    await render(
      hbs`<NrgTextField @model={{this}} @valuePath="value" @type="number" />`
    );

    await fillIn('input', '123');
    await fillIn('input', '123.4');

    assert.dom('input').hasValue('123');
    assert.strictEqual(this.value, 123);
  });

  test('number fields allow negative numbers', async function (assert) {
    await render(
      hbs`<NrgTextField @model={{this}} @valuePath="value" @type="number" @allowNegatives={{true}} />`
    );

    await fillIn('input', '-123');

    assert.dom('input').hasValue('-123');
    assert.strictEqual(this.value, -123);
  });

  test('number fields allow negative decimal numbers', async function (assert) {
    await render(
      hbs`<NrgTextField @model={{this}} @valuePath="value" @type="number" @allowDecimals={{true}} @allowNegatives={{true}} />`
    );

    await fillIn('input', '-123.45');

    assert.dom('input').hasValue('-123.45');
    assert.strictEqual(this.value, -123.45);
  });

  test('number fields do not allow negative decimal numbers', async function (assert) {
    await render(
      hbs`<NrgTextField @model={{this}} @valuePath="value" @type="number" @allowNegatives={{true}} />`
    );

    await fillIn('input', '-123');
    await fillIn('input', '-123.4');

    assert.dom('input').hasValue('-123');
    assert.strictEqual(this.value, -123);
  });

  test('number fields default to min', async function (assert) {
    this.min = -5;
    this.value = 7;

    await render(
      hbs`<NrgTextField @model={{this}} @valuePath="value" @type="number" @min={{this.min}} />`
    );

    assert.dom('input').hasValue('7');
    assert.strictEqual(this.value, 7);

    await fillIn('input', '');

    assert.dom('input').hasValue('-5');
    assert.strictEqual(this.value, -5);
  });
});
