import ObjectProxy from '@ember/object/proxy';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | nrg-home-cards', function(hooks) {
  setupRenderingTest(hooks);
  hooks.beforeEach(function() {
    const currentUser = ObjectProxy.create({
      content: {
        hasRole(role) {
          return role === 'users';
        },
      },
    });
    this.owner.register('user:current', currentUser, {
      instantiate: false,
      singleton: true,
    });
    this.owner.inject('service', 'currentUser', 'user:current');
  });

  test('it renders', async function(assert) {
    await render(hbs`
      <NrgHomeCards @actionCard={{true}} as |view|>
        <view.home-card @label="Item 1" @icon="settings" />
        <view.home-card @label="Item 2" @icon="settings" />
        <view.home-card @label="Item 3" @icon="settings" />
      </NrgHomeCards>
    `);

    assert.ok(this.element.textContent.trim().includes('Item 1'));
    assert.ok(this.element.textContent.trim().includes('Item 2'));
    assert.ok(this.element.textContent.trim().includes('Item 3'));
  });

  test('access restricted cards are hidden', async function(assert) {
    await render(hbs`
      <NrgHomeCards as |view|>
        <view.home-card @label="I am visible" @role="users" @icon="settings" />
        <view.home-card @label="I am not visible" @role="administrator" @icon="settings" />
      </NrgHomeCards>
    `);

    assert.ok(this.element.textContent.trim().includes('I am visible'), 'Visible card is shown');
    assert.notOk(this.element.textContent.trim().includes('I am invisible'), 'Hidden card is hidden');
  });
});
