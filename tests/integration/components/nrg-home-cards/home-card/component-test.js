import ObjectProxy from '@ember/object/proxy';
import { find, render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('Integration | Component | nrg-home-cards/home-card', function(hooks) {
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

  test('hidden if user does not have role', async function(assert) {
    await render(hbs`<NrgHomeCards::HomeCard @role="administrators" />`);
    assert.dom('.home-card').hasClass('is-visually-hidden');
  });

  test('show if user has role', async function(assert) {
    await render(hbs`<NrgHomeCards::HomeCard @role="users" />`);
    assert.dom('.home-card').hasNoClass('is-visually-hidden');
  });
});
