import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | nrg-checkbox', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{nrg-checkbox label='label text'}}`);

    assert.equal(this.element.textContent.trim(), 'label text');
  });

  test('click toggles state', async function(assert) {
    this.checked = false;
    await render(hbs`{{nrg-checkbox checked=checked}}`);
    this.$('.checkbox > input').click();

    assert.ok(this.checked);
  });

  test('clicking label toggles state', async function(assert) {
    this.checked = false;
    await render(hbs`{{nrg-checkbox checked=checked}}`);
    this.$('.checkbox > label').click();

    assert.ok(this.checked);
  });

  test('click does nothing when disabled', async function(assert) {
    this.checked = false;
    await render(hbs`{{nrg-checkbox checked=checked disabled=true}}`);
    this.$('.checkbox').click();

    assert.notOk(this.checked);
  });
});
