import { find, render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';
import ENV from '../../../../config/environment';

module('Integration | Component | nrg-appbar', function(hooks) {
  setupRenderingTest(hooks);

  test('title renders', async function(assert) {
    await render(hbs`<NrgAppbar @title="test title" />`);

    assert.equal(find('.header.item').textContent.trim(), 'test title');
  });

  test('non-production environments display', async function(assert) {
    ENV['ember-nrg-ui'] = {
      productionEnvironments: [],
    };
    this.set('applicationSettings', {
      localEnvironment: 'bob',
    });
    await render(hbs`<NrgAppbar @applicationSettings={{applicationSettings}} @title="test title" />`);
    assert.equal(find('.environment-title').textContent.trim(), 'BOB');
  });

  test('production evironment should not display', async function(assert) {
    ENV['ember-nrg-ui'] = {
      productionEnvironments: ['bob'],
    };
    this.set('applicationSettings', {
      localEnvironment: 'bob',
    });
    await render(hbs`<NrgAppbar @applicationSettings={{applicationSettings}} @title="test title" />`);
    assert.notOk(find('.environment-title'));
  });
});
