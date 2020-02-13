import { fillIn, find, render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('Integration | Component | nrg-text-field/trim-input', function(hooks) {
  setupRenderingTest(hooks);

  test('trim white space', async function(assert) {
    this.set('value', 'bob     ');
    await render(hbs`{{nrg-text-field/trim-input value=value}}`);
    assert.equal(find('input').value, 'bob');
    this.set('value', 'jim     ');
    assert.equal(find('input').value, 'jim');
  });

  test('trim white space from user input', async function(assert) {
    this.set('value', '');
    await render(hbs`{{nrg-text-field/trim-input value=value}}`);
    await fillIn('input', 'bob     ');
    assert.equal(this.value, 'bob');
  });
});
