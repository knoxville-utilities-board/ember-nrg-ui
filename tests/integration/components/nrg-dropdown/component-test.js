import { click, find, fillIn, focus, render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';
import { triggerKeyDown } from 'ember-keyboard';

module('Integration | Component | nrg-dropdown', function(hooks) {
  hooks.beforeEach(() => {
    this.options = [
      {
        label: 'Option 1',
        label2: 'Label2 1',
      },
      {
        label: 'Option 2',
        label2: 'Label2 2',
      },
    ];
    this.selectedOption = this.options[1];
  });

  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`<NrgDropdown @options={{options}} />`);

    assert.equal(find('.text').textContent.trim(), 'Select an Option');
  });

  test('default text renders', async function(assert) {
    await render(hbs`<NrgDropdown @options={{options}} @defaultText="Pick Something" />`);

    assert.equal(find('.text').textContent.trim(), 'Pick Something');
  });

  test('item prepopulation works', async function(assert) {
    await render(hbs`<NrgDropdown @options={{options}} @selected={{selectedOption}} />`);

    assert.equal(find('.text').textContent.trim(), 'Option 2');
  });

  test('block templating works', async function(assert) {
    await render(hbs`
      <NrgDropdown @options={{options}} @selected={{selectedOption}} as |option|>
        {{option.label2}}
      </NrgDropdown>
    `);

    assert.equal(find('.text').textContent.trim(), 'Label2 2');
  });

  test('menu keyboard navigation - arrow down', async function(assert) {
    this.options = [
      {
        label: 'Option 1',
        value: 'Value 1',
      },
      {
        label: 'Option 2',
        value: 'Value 2',
      },
    ];
    await render(hbs`<NrgDropdown @options={{options}} />`);
    await click('.dropdown');
    await triggerKeyDown('ArrowDown');
    await triggerKeyDown('ArrowDown');
    await triggerKeyDown('Enter');
    assert.equal(find('.text').textContent.trim(), 'Option 2');
  });

  test('menu keyboard navigation - arrow up', async function(assert) {
    this.options = [
      {
        label: 'Option 1',
        value: 'Value 1',
      },
      {
        label: 'Option 2',
        value: 'Value 2',
      },
    ];
    await render(hbs`<NrgDropdown @options={{options}} />`);
    await click('.dropdown');
    await triggerKeyDown('ArrowDown');
    await triggerKeyDown('ArrowDown');
    await triggerKeyDown('ArrowUp');
    await triggerKeyDown('Enter');
    assert.equal(find('.text').textContent.trim(), 'Option 1');
  });

  test('menu keyboard navigation - select and tab', async function(assert) {
    this.options = [
      {
        label: 'Option 1',
        value: 'Value 1',
      },
      {
        label: 'Option 2',
        value: 'Value 2',
      },
    ];
    await render(hbs`<NrgDropdown @options={{options}} />`);
    await click('.dropdown');
    await triggerKeyDown('ArrowDown');
    await triggerKeyDown('ArrowDown');
    await triggerKeyDown('Tab');
    assert.equal(find('.text').textContent.trim(), 'Option 2');
  });

  test('menu keyboard navigation - search and tab', async function(assert) {
    this.options = [
      {
        label: 'Option 1',
        value: 'Value 1',
      },
      {
        label: 'Option 2',
        value: 'Value 2',
      },
    ];
    await render(hbs`<NrgDropdown @search={{true}} @options={{options}} />`);
    await click('.dropdown');
    await fillIn('input', '2');
    await triggerKeyDown('Tab');
    assert.equal(find('.text').textContent.trim(), 'Option 2');
  });

  test('open dropdown with dom focus', async function(assert) {
    this.options = [
      {
        label: 'Option 1',
        value: 'Value 1',
      },
    ];
    await render(hbs`<NrgDropdown @search={{true}} @options={{options}} />`);
    await focus('input')
    assert.ok(find('.dropdown.visible'));
  });
});
