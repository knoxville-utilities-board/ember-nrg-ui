import Service from '@ember/service';
import { click, render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('Integration | Component | nrg-flyout', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    class ApplicationServiceStub extends Service {
      environmentConfig = {
        'ember-nrg-ui': {
          productionEnvironments: ['prod'],
        },
        environment: 'test',
      };
      settings = {
        localEnvironment: 'test',
      };
    }
    this.owner.register('service:application', ApplicationServiceStub);
  });

  test('primary button works', async function (assert) {
    assert.expect(1);
    this.onButtonClick = function () {
      assert.ok(true);
    };
    await render(hbs`
      <NrgFlyoutContainer />
      <NrgFlyout @primaryButton="Button Text" @isOpen={{true}} @onPrimaryButtonClick={{this.onButtonClick}} />
    `);
    await click('button');
  });

  test('secondary button works', async function (assert) {
    assert.expect(1);
    this.onButtonClick = function () {
      assert.ok(true);
    };
    await render(hbs`
      <NrgFlyoutContainer />
      <NrgFlyout @secondaryButton="Button Text" @isOpen={{true}} @onSecondaryButtonClick={{this.onButtonClick}} />
    `);
    await click('button');
  });

  test('flyout handles multiple isOpen changes', async function (assert) {
    this.isOpen = false;
    await render(hbs`
      <NrgFlyoutContainer />
      <NrgFlyout @isOpen={{this.isOpen}}>
        <h2>Test Content</h2>
      </NrgFlyout>
    `);
    assert.dom('.ui.flyouts h2').doesNotExist();
    this.set('isOpen', true);
    assert.dom('.ui.flyouts h2').exists();
    this.set('isOpen', false);
    assert.dom('.ui.flyouts h2').doesNotExist();
  });

  test('it renders block text in place', async function (assert) {
    await render(hbs`
      <NrgFlyout @isOpen={{true}} @renderInPlace={{true}}>
        block text
      </NrgFlyout>
    `);
    assert.dom('*').hasText('block text');
  });
});
