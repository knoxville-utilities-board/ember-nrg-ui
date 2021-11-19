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

module('Integration | Component | nrg-home-cards/home-card', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register('service:application', ApplicationServiceStub);
  });

  test('hidden if user does not have role', async function (assert) {
    await render(hbs`<NrgHomeCards::HomeCard @role="administrators" />`);
    assert.dom('.home-card').hasClass('is-visually-hidden');
  });

  test('show if user has role', async function (assert) {
    await render(hbs`<NrgHomeCards::HomeCard @role="users" />`);
    assert.dom('.home-card').hasNoClass('is-visually-hidden');
  });
});
