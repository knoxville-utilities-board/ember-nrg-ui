import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | format-number', function(hooks) {
  setupRenderingTest(hooks);

  test('decimal for hbs template', async function(assert) {
    this.set('value', '1000000.1');

    await render(hbs`{{format-number value 2}}`);

    assert.equal(this.element.textContent.trim(), '1,000,000.10');
  });

  test('integer for hbs template', async function(assert) {
    this.set('value', '1000000');

    await render(hbs`{{format-number value 0}}`);

    assert.equal(this.element.textContent.trim(), '1,000,000');

    this.set('value', '-1060000');
    assert.equal(this.element.textContent.trim(), '-1,060,000');
  });
});
