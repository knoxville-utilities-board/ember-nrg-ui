import { find, render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('Integration | Component | nrg-not-found', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{nrg-not-found}}`);

    assert.equal(
      find('h3').textContent.trim(),
      'This is slightly embarrassing.'
    );
  });
});
