import { click, render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('Integration | Component | nrg-modal', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    const service = this.owner.lookup('service:application');
    service.set('isTesting', false);
  });

  test('secondary button works', async function (assert) {
    assert.expect(1);
    this.onButtonClick = function () {
      assert.ok(true);
    };
    await render(hbs`
      <NrgModalContainer />
      <NrgModal @secondaryButton="Button Text" @isOpen={{true}} @onSecondaryButtonClick={{action this.onButtonClick}} />
    `);
    await click('button');
  });

  test('primary button works', async function (assert) {
    assert.expect(1);
    this.onButtonClick = function () {
      assert.ok(true);
    };
    await render(hbs`
      <NrgModalContainer />
      <NrgModal @primaryButton="Button Text" @isOpen={{true}} @onPrimaryButtonClick={{action this.onButtonClick}} />
    `);
    await click('button');
  });

  test('modal handles mutliple isOpen changes', async function (assert) {
    this.isOpen = false;
    await render(hbs`
      <NrgModalContainer />
      <NrgModal @isOpen={{isOpen}}>
        <h2>Test Content</h2>
      </NrgModal>
    `);
    assert.dom('.ui.modals h2').doesNotExist();
    this.set('isOpen', true);
    assert.dom('.ui.modals h2').exists();
    this.set('isOpen', false);
    assert.dom('.ui.modals h2').doesNotExist();
  });

  test('it renders block text in place', async function (assert) {
    await render(hbs`
      <NrgModal @isOpen={{true}} @renderInPlace={{true}}>
        block text
      </NrgModal>
    `);
    assert.dom('*').hasText('block text');
  });

  test('modal supports being destroying instead of using isOpen', async function (assert) {
    assert.expect(3);
    this.onModalClose = function () {
      assert.ok(true);
    };
    this.hasModal = true;
    await render(hbs`
      <NrgModalContainer />
      {{#if hasModal}}
        <NrgModal @isOpen={{true}} @onModalClose={{action this.onModalClose}}>
          block text
        </NrgModal>
      {{/if}}
    `);
    assert.dom('.ui.modals').hasText('block text');
    this.set('hasModal', false);
    assert.dom('.ui.modals').hasText('');
  });
});
