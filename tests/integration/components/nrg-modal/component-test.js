import { click, find, render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('Integration | Component | nrg-modal', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    const service = this.owner.lookup('service:application');
    service.set('isTesting', false);
  });

  test('secondary button works', async function(assert) {
    this.onButtonClick = function() {
      assert.ok(true);
    };
    await render(hbs`
      <NrgModalContainer />
      <NrgModal @secondaryButton="Button Text" @isOpen={{true}} @onSecondaryButtonClick={{action this.onButtonClick}} />
    `);
    await click('button');
  });

  test('primary button works', async function(assert) {
    this.onButtonClick = function() {
      assert.ok(true);
    };
    await render(hbs`
      <NrgModalContainer />
      <NrgModal @primaryButton="Button Text" @isOpen={{true}} @onPrimaryButtonClick={{action this.onButtonClick}} />
    `);
    await click('button');
  });

  test('modal handles mutliple isOpen changes', async function(assert) {
    this.isOpen = false;
    await render(hbs`
      <NrgModalContainer />
      <NrgModal @isOpen={{isOpen}}>
        <h2>Test Content</h2>
      </NrgModal>
    `);
    assert.notOk(find('.ui.modals h2'));
    this.set('isOpen', true);
    assert.ok(find('.ui.modals h2'));
    this.set('isOpen', false);
    assert.notOk(find('.ui.modals h2'));
  });

  test('it renders block text in place', async function(assert) {
    await render(hbs`
      <NrgModal @isOpen={{true}} @renderInPlace={{true}}>
        block text
      </NrgModal>
    `);
    assert.equal(find('*').textContent.trim(), 'block text');
  });

  test('modal supports being destroying instead of using isOpen', async function(assert) {
    assert.expect(3);
    this.onModalClose = function() {
      assert.ok(true);
    }
    this.hasModal = true;
    await render(hbs`
      <NrgModalContainer />
      {{#if hasModal}}
        <NrgModal @isOpen={{true}} @onModalClose={{action this.onModalClose}}>
          block text
        </NrgModal>
      {{/if}}
    `);
    assert.equal(find('.ui.modals').textContent.trim(), 'block text');
    this.set('hasModal', false);
    assert.equal(find('.ui.modals').textContent.trim(), '');
  });
});
