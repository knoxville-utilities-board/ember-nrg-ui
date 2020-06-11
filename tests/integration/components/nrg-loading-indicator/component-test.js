import { find, findAll, render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('Integration | Component | nrg-loading-indicator', function(hooks) {
  setupRenderingTest(hooks);

  test('loader is active', async function(assert) {
    await render(hbs`<NrgLoadingIndicator />`);
    assert.equal(findAll('.ui.loader.active').length, 1);
  });

  test('loader text is displayed', async function(assert) {
    await render(hbs`<NrgLoadingIndicator @text="Tyler can code." />`);
    assert.equal(find('*').textContent.trim(), 'Tyler can code.');
  });

  test('loader size is set corrected', async function(assert) {
    await render(hbs`<NrgLoadingIndicator @size="tiny" />`);
    assert.equal(findAll('.ui.loader.active.tiny').length, 1);
  });

  test('loader is indeterminate', async function(assert) {
    await render(hbs`<NrgLoadingIndicator @indeterminate={{true}} />`);
    assert.equal(findAll('.ui.loader.active.indeterminate').length, 1);
  });
});
