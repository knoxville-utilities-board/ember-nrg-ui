import Service from '@ember/service';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

class ApplicationServiceStub extends Service {
  environmentConfig = {};
  user = {
    hasRole(role) {
      return role === 'users';
    },
  };
}

module('Integration | Component | nrg-home-cards', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    this.owner.register('service:application', ApplicationServiceStub);
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

  test('access restricted cards are hidden', async function (assert) {
    this.owner.register('service:application', ApplicationServiceStub);
    await render(hbs`
      <NrgHomeCards as |view|>
        <view.home-card @label="I am visible" @role="users" @icon="settings" />
        <view.home-card @label="I am not visible" @role="administrator" @icon="settings" />
      </NrgHomeCards>
    `);

    assert.ok(
      this.element.textContent.trim().includes('I am visible'),
      'Visible card is shown'
    );
    assert.notOk(
      this.element.textContent.trim().includes('I am invisible'),
      'Hidden card is hidden'
    );
  });
});
