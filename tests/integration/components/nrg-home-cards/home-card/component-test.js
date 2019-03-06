import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import ObjectProxy from '@ember/object/proxy';

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
    this.owner.inject('component', 'currentUser', 'user:current');
  });

  test('hidden if user does not have role', async function(assert) {
    await render(hbs`{{nrg-home-cards/home-card role='administrators'}}`);
    assert.notOk(this.$('.home-card').is(':visible'));
  });

  test('show if user has role', async function(assert) {
    await render(hbs`{{nrg-home-cards/home-card role='users'}}`);
    assert.ok(this.$('.home-card').is(':visible'));
  });
});
