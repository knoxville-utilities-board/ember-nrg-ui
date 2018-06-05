import {
  module,
  test
} from 'qunit';
import {
  setupRenderingTest
} from 'ember-qunit';
import {
  render
} from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import setupValidations from '../../../helpers/setup-validations';

module('Integration | Component | nrg-text-area', function(hooks) {
  setupRenderingTest(hooks);

  test('use like a regular text area with bound value', async function(assert) {
    setupValidations(this);
    this.set('value', 'bob');

    await render(hbs `{{nrg-text-area value=value}}`);

    assert.equal(this.$('textarea').val(), 'bob');
  });
});
