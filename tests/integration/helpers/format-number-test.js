import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | format-number', function (hooks) {
  setupRenderingTest(hooks);

  test('decimal for hbs template', async function (assert) {
    this.set('value', '1000000.1');

    await render(hbs`{{format-number value 2}}`);

    assert.dom(this.element).hasText('1,000,000.10');
  });

  test('integer for hbs template', async function (assert) {
    this.set('value', '1000000');

    await render(hbs`{{format-number value 0}}`);

    assert.dom(this.element).hasText('1,000,000');

    this.set('value', '-1060000');
    assert.dom(this.element).hasText('-1,060,000');
  });

  test('high precision decimal for hbs template', async function (assert) {
    this.set('value', '1000000.1');

    await render(hbs`{{format-number value 6}}`);

    assert.dom(this.element).hasText('1,000,000.100000');
  });

  test('high precision decimal with no decimals for hbs template', async function (assert) {
    this.set('value', '1000000');

    await render(hbs`{{format-number value 6}}`);

    assert.dom(this.element).hasText('1,000,000.000000');
  });

  test('high precision decimal with 4 decimals for hbs template', async function (assert) {
    this.set('value', '1000000.1234');

    await render(hbs`{{format-number value 4}}`);

    assert.dom(this.element).hasText('1,000,000.1234');
  });
});
