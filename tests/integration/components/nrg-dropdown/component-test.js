import { find, render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

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
    await render(hbs`{{nrg-dropdown options=options}}`);

    assert.equal(find('.text').textContent.trim(), 'Select an Option');
  });

  test('default text renders', async function(assert) {
    await render(
      hbs`{{nrg-dropdown options=options defaultText='Pick Something'}}`
    );

    assert.equal(find('.text').textContent.trim(), 'Pick Something');
  });

  test('item prepopulation works', async function(assert) {
    await render(hbs`{{nrg-dropdown options=options selected=selectedOption}}`);

    assert.equal(find('.text').textContent.trim(), 'Option 2');
  });

  test('block templating works', async function(assert) {
    await render(hbs`
      {{#nrg-dropdown options=options selected=selectedOption as |option|}}
        {{option.label2}}
      {{/nrg-dropdown}}
    `);

    assert.equal(find('.text').textContent.trim(), 'Label2 2');
  });
});
