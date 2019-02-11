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

module('Integration | Component | nrg-application', function(hooks) {
  setupRenderingTest(hooks);

  test('title rendered', async function(assert) {
    this.set('clickedItem', () => {});
    await render(hbs `{{nrg-application title='Application Title' clicked=(action clickedItem)}}`);
    assert.ok(this.element.textContent.trim().match(/Application Title/));
  });
});
