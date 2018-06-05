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

module('Integration | Component | nrg-loading-indicator', function(hooks) {
  setupRenderingTest(hooks);

  test('loader is active', async function(assert) {
    await render(hbs `{{nrg-loading-indicator}}`);
    assert.equal(this.$('.ui.loader.active').length, 1);
  });

  test('loader text is displayed', async function(assert) {
    await render(hbs `{{nrg-loading-indicator text='Zach can code.'}}`);
    assert.equal(this.element.textContent.trim(), 'Zach can code.');
  });

  test('loader size is set corrected', async function(assert) {
    await render(hbs `{{nrg-loading-indicator size='tiny'}}`);
    assert.equal(this.$('.ui.loader.active.tiny').length, 1);
  });

  test('loader is indeterminate', async function(assert) {
    await render(hbs `{{nrg-loading-indicator indeterminate=true}}`);
    assert.equal(this.$('.ui.loader.active.indeterminate').length, 1);
  });
});
