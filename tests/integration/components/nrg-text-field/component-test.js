import { find, render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';
import setupValidations from '../../../helpers/setup-validations';

module('Integration | Component | nrg-text-field', function(hooks) {
  setupRenderingTest(hooks);

  test('use like a regular text field with bound value', async function(assert) {
    setupValidations(this);
    this.set('value', 'bob');

    await render(hbs`{{nrg-text-field value=value}}`);

    assert.equal(find('input').value, 'bob');
  });
});
