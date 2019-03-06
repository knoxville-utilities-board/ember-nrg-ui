import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | nrg-text-field/trim-input', function(hooks) {
  setupRenderingTest(hooks);

  test('trim white space', async function(assert) {
    this.set('value', 'bob     ');
    await render(hbs`{{nrg-text-field/trim-input value=value}}`);
    assert.equal(this.$('input').val(), 'bob');
    this.set('value', 'jim     ');
    assert.equal(this.$('input').val(), 'jim');
  });

  test('trim white space from user input', async function(assert) {
    this.set('value', '');
    await render(hbs`{{nrg-text-field/trim-input value=value}}`);
    this.$('input')
      .val('bob     ')
      .change();
    assert.equal(this.get('value'), 'bob');
  });
});
