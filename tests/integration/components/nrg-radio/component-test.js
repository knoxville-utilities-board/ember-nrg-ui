import { find, findAll, render, click } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('Integration | Component | nrg-radio', function(hooks) {
  setupRenderingTest(hooks);

  test('it becomes checked when its value is selected', async function(assert) {
    await render(hbs`{{nrg-radio value='1' selectedValue='1'}}`);
    assert.ok(find('.ui.checkbox.radio input').checked);
  });

  test('label is clickable', async function(assert) {
    await render(hbs`{{nrg-radio value='1'}}`);
    assert.notOk(find('.ui.checkbox.radio input').checked);
    await click('label');
    assert.ok(find('.ui.checkbox.radio input').checked);
  });

  test('radio is clickable', async function(assert) {
    await render(hbs`{{nrg-radio value='1'}}`);
    assert.notOk(find('.ui.checkbox.radio input').checked);
    await click('input');
    assert.ok(find('.ui.checkbox.radio input').checked);
  });

  test('only one radio is checked in a group', async function(assert) {
    this.selectedValue = '1';
    await render(hbs`
      {{nrg-radio name="bob" value='1' selectedValue=selectedValue}}
      {{nrg-radio name="bob" value='2' selectedValue=selectedValue}}
    `);

    const inputs = findAll('.ui.checkbox.radio input');

    assert.ok(inputs[0].checked);
    assert.notOk(inputs[1].checked);

    await click(inputs[1]);

    assert.notOk(inputs[0].checked);
    assert.ok(inputs[1].checked);
    assert.equal(this.selectedValue, '2');
  });
});
