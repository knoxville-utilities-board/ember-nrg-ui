import { fillIn, render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('Integration | Component | nrg-text-field/trim-input', function (hooks) {
  setupRenderingTest(hooks);

  test('trim white space', async function (assert) {
    this.set('value', 'bob     ');
    await render(hbs`<NrgTextField::TrimInput @value={{this.value}}/>`);
    assert.dom('input').hasValue('bob');
    this.set('value', 'jim     ');
    assert.dom('input').hasValue('jim');
  });

  test('trim white space from user input', async function (assert) {
    assert.expect(1);
    this.onChange = (value) => {
      assert.strictEqual(value, 'bob');
    };
    this.set('value', '');
    await render(
      hbs`<NrgTextField::TrimInput @value={{this.value}} @onChange={{this.onChange}}/>`
    );
    await fillIn('input', 'bob     ');
  });
});
