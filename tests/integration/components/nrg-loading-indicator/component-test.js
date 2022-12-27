import { find, findAll, render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('Integration | Component | nrg-loading-indicator', function(hooks) {
  setupRenderingTest(hooks);

  test('loader is active', async function(assert) {
    await render(hbs`<NrgLoadingIndicator />`);
    assert.dom('.ui.loader.active').exists({ count: 1 });
  });

  test('loader text is displayed', async function(assert) {
    await render(hbs`<NrgLoadingIndicator @text="Tyler can code." />`);
    assert.dom('*').hasText('Tyler can code.');
  });

  test('loader size is set corrected', async function(assert) {
    await render(hbs`<NrgLoadingIndicator @size="tiny" />`);
    assert.dom('.ui.loader.active.tiny').exists({ count: 1 });
  });

  test('loader is indeterminate', async function(assert) {
    await render(hbs`<NrgLoadingIndicator @indeterminate={{true}} />`);
    assert.dom('.ui.loader.active.indeterminate').exists({ count: 1 });
  });
});
