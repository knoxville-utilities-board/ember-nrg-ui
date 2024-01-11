import { click, find, findAll, render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('Integration | Component | nrg-radio', function (hooks) {
  setupRenderingTest(hooks);

  test('it becomes checked when its value is selected', async function (assert) {
    this.selectedValue = '1';
    await render(
      hbs`<NrgRadio @value="1" @model={{this}} @valuePath="selectedValue" />`
    );
    assert.dom('.ui.checkbox.radio input').isChecked();
  });

  test('input is clickable', async function (assert) {
    this.selectedValue = '0';
    await render(
      hbs`<NrgRadio @value="1" @model={{this}} @valuePath="selectedValue" />`
    );
    assert.strictEqual(this.selectedValue, '0');
    await click('.ui.checkbox.radio input');
    assert.strictEqual(this.selectedValue, '1');
  });

  test('label is clickable', async function (assert) {
    this.selectedValue = '0';
    await render(
      hbs`<NrgRadio @value="1" @model={{this}} @valuePath="selectedValue" @label="clickable label" />`
    );
    assert.strictEqual(this.selectedValue, '0');
    await click(find('.ui.checkbox.radio label'));
    assert.strictEqual(this.selectedValue, '1');
  });

  test('only one radio is checked in a group', async function (assert) {
    this.selectedValue = '1';
    await render(hbs`
      <NrgRadio @name="bob" @value="1" @model={{this}} @valuePath="selectedValue" />
      <NrgRadio @name="bob" @value="2" @model={{this}} @valuePath="selectedValue" />
    `);

    const inputs = findAll('.ui.checkbox.radio input');

    assert.ok(inputs[0].checked);
    assert.notOk(inputs[1].checked);

    await click(inputs[1]);

    assert.notOk(inputs[0].checked);
    assert.ok(inputs[1].checked);
    assert.strictEqual(this.selectedValue, '2');
  });

  test('field can be marked readonly', async function (assert) {
    this.checked = false;
    await render(
      hbs`<NrgRadio @model={{this}} @valuePath="checked" @readonly={{true}} />`
    );
    await click('.radio');

    assert.notOk(this.checked);
    assert.dom('.radio').hasClass('read-only');
    assert.dom('.radio > input').hasAttribute('readonly');
    assert.dom('.radio > input').isNotDisabled();
  });
});
