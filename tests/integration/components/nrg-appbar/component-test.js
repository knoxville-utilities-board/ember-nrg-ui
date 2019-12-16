import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import ENV from '../../../../config/environment';

module('Integration | Component | nrg-appbar', function(hooks) {
  setupRenderingTest(hooks);

  test('title renders', async function(assert) {
    await render(hbs`{{nrg-appbar title='test title'}}`);

    assert.equal(
      this.$('.header.item')
        .text()
        .trim(),
      'test title'
    );
  });

  test('non-production environments display', async function(assert) {
    ENV['ember-nrg-ui'] = {
      productionEnvironments: [],
    };
    this.set('applicationSettings', {
      localEnvironment: 'bob',
    });
    await render(hbs`{{nrg-appbar applicationSettings=applicationSettings title='test title'}}`);
    assert.equal(
      this.$('.environment-title').text().trim(), 'BOB'
    );
  });

  test('production evironment should not display', async function(assert) {
    ENV['ember-nrg-ui'] = {
      productionEnvironments: ['bob'],
    };
    this.set('applicationSettings', {
      localEnvironment: 'bob',
    });
    await render(hbs`{{nrg-appbar applicationSettings=applicationSettings title='test title'}}`);
    assert.notEqual(
      this.$('.environment-title').text().trim(), 'BOB'
    );
  });
});
