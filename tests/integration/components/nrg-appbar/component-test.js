import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | nrg-appbar', function(hooks) {
  setupRenderingTest(hooks);

  test('title renders', async function(assert) {
    await render(hbs`{{nrg-appbar title='test title'}}`);

    assert.equal(
      this.$('.header.item')
        .text()
        .trim(),
      'test title'
    );
  });
});
