import { find, findAll, render, click } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('Integration | Component | nrg-radio', function(hooks) {
  setupRenderingTest(hooks);

  test('it becomes checked when its value is selected', async function(assert) {
    await render(hbs`<NrgRadio @value="1" @selectedValue="1" />`);
    assert.dom('.ui.checkbox.radio input').isChecked();
  });

  test('label is clickable', async function(assert) {
    await render(hbs`<NrgRadio @value="1" />`);
    assert.dom('.ui.checkbox.radio input').isNotChecked();
    await click('label');
    assert.dom('.ui.checkbox.radio input').isChecked();
  });

  test('radio is clickable', async function(assert) {
    await render(hbs`<NrgRadio @value="1" />`);
    assert.dom('.ui.checkbox.radio input').isNotChecked();
    await click('input');
    assert.dom('.ui.checkbox.radio input').isChecked();
  });

  test('only one radio is checked in a group', async function(assert) {
    this.selectedValue = '1';
    await render(hbs`
      <NrgRadio @name="bob" @value="1" @selectedValue={{selectedValue}} />
      <NrgRadio @name="bob" @value="2" @selectedValue={{selectedValue}} />
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
