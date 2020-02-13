import { find, findAll, render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('Integration | Component | nrg-loading-indicator', function(hooks) {
  setupRenderingTest(hooks);

  test('loader is active', async function(assert) {
    await render(hbs`{{nrg-loading-indicator}}`);
    assert.equal(findAll('.ui.loader.active').length, 1);
  });

  test('loader text is displayed', async function(assert) {
    await render(hbs`{{nrg-loading-indicator text='Zach can code.'}}`);
    assert.equal(find('*').textContent.trim(), 'Zach can code.');
  });

  test('loader size is set corrected', async function(assert) {
    await render(hbs`{{nrg-loading-indicator size='tiny'}}`);
    assert.equal(findAll('.ui.loader.active.tiny').length, 1);
  });

  test('loader is indeterminate', async function(assert) {
    await render(hbs`{{nrg-loading-indicator indeterminate=true}}`);
    assert.equal(findAll('.ui.loader.active.indeterminate').length, 1);
  });
});
