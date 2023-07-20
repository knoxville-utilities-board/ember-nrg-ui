import { click, fillIn, focus, render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';
import { triggerKeyDown } from 'ember-keyboard';
import { tracked } from '@glimmer/tracking';

module('Integration | Component | nrg-dropdown', function (hooks) {
  hooks.beforeEach(function () {
    class Model {
      @tracked
      selectedOption;
    }
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
    this.model = new Model();
    this.model.selectedOption = this.options[1];
  });

  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<NrgDropdown @options={{this.options}} />`);

    assert.dom('.text').hasText('Select an Option');
  });

  test('default text renders', async function (assert) {
    await render(
      hbs`<NrgDropdown @options={{this.options}} @defaultText="Pick Something" />`
    );

    assert.dom('.text').hasText('Pick Something');
  });

  test('forceSelection works', async function (assert) {
    this.model.selectedOption = undefined;
    await render(
      hbs`<NrgDropdown @model={{this.model}} @valuePath="selectedOption" @options={{this.options}} @forceSelection={{true}} />`
    );

    assert.dom('.text').hasText('Option 1');
  });

  test('item prepopulation works', async function (assert) {
    await render(
      hbs`<NrgDropdown @options={{this.options}} @model={{this.model}} @valuePath="selectedOption" />`
    );

    assert.dom('.text').hasText('Option 2');
  });

  test('block templating works', async function (assert) {
    await render(hbs`
      <NrgDropdown @options={{this.options}} @model={{this.model}} @valuePath="selectedOption" as |option|>
        {{option.label2}}
      </NrgDropdown>
    `);

    assert.dom('.text').hasText('Label2 2');
  });

  test('menu keyboard navigation - arrow down', async function (assert) {
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
    await render(
      hbs`<NrgDropdown @model={{this.model}} @valuePath="valuePath" @options={{this.options}} />`
    );
    await click('.dropdown');
    await triggerKeyDown('ArrowDown');
    await triggerKeyDown('ArrowDown');
    await triggerKeyDown('Enter');
    assert.dom('.text').hasText('Option 2');
  });

  test('menu keyboard navigation - arrow up', async function (assert) {
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
    await render(
      hbs`<NrgDropdown @model={{this.model}} @valuePath="selectedOption" @options={{this.options}} />`
    );
    await click('.dropdown');
    await triggerKeyDown('ArrowDown');
    await triggerKeyDown('ArrowDown');
    await triggerKeyDown('ArrowUp');
    await triggerKeyDown('Enter');
    assert.dom('.text').hasText('Option 1');
  });

  test('menu keyboard navigation - select and tab', async function (assert) {
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
    await render(
      hbs`<NrgDropdown @model={{this.model}} @valuePath="selectedOption" @options={{this.options}} />`
    );
    await click('.dropdown');
    await triggerKeyDown('ArrowDown');
    await triggerKeyDown('ArrowDown');
    await triggerKeyDown('Tab');
    assert.dom('.text').hasText('Option 2');
  });

  test('menu keyboard navigation - search and tab', async function (assert) {
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
    await render(
      hbs`<NrgDropdown @model={{this.model}} @valuePath="selectedOption" @search={{true}} @options={{this.options}} />`
    );
    await click('.dropdown');
    await fillIn('input', '2');
    await triggerKeyDown('Tab');
    assert.dom('.text').hasText('Option 2');
  });

  test('open dropdown with dom focus', async function (assert) {
    this.options = [
      {
        label: 'Option 1',
        value: 'Value 1',
      },
    ];
    await render(
      hbs`<NrgDropdown @search={{true}} @options={{this.options}} />`
    );
    await focus('input');
    assert.dom('.dropdown.visible').exists();
  });

  test('field can be marked readonly', async function (assert) {
    await render(
      hbs`<NrgDropdown @model={{this.model}} @valuePath="selectedOption" @readonly={{true}} />`
    );
    assert.dom('.dropdown').hasClass('read-only');
  });

  test('searchable field can be marked readonly', async function (assert) {
    await render(
      hbs`<NrgDropdown @model={{this.model}} @valuePath="selectedOption" @readonly={{true}} @search={{true}} />`
    );
    assert.dom('.dropdown').hasClass('read-only');
    assert.dom('.dropdown > input').hasAttribute('readonly');
  });
});
