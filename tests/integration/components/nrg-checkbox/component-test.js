import { click, render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('Integration | Component | nrg-checkbox', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`<NrgCheckbox @label="label text" />`);

    assert.dom(this.element).hasText('label text');
  });

  test('click toggles state', async function(assert) {
    this.checked = false;
    await render(hbs`<NrgCheckbox @checked={{checked}} />`);
    await click('.checkbox > input');

    assert.ok(this.checked);
  });

  test('clicking label toggles state', async function(assert) {
    this.checked = false;
    await render(hbs`<NrgCheckbox @checked={{checked}} />`);
    await click('.checkbox > label');

    assert.ok(this.checked);
  });

  test('click does nothing when disabled', async function(assert) {
    this.checked = false;
    await render(hbs`<NrgCheckbox @checked={{checked}} @disabled={{true}} />`);
    await click('.checkbox');

    assert.notOk(this.checked);
  });
});
