import Service from '@ember/service';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('Integration | Component | nrg-appbar', function (hooks) {
  setupRenderingTest(hooks);

  test('title renders', async function (assert) {
    class ApplicationServiceStub extends Service {
      environmentConfig = {
        'ember-nrg-ui': {
          productionEnvironments: ['prod'],
        },
      };
      pageTitle = 'test title';
    }
    this.owner.register('service:application', ApplicationServiceStub);
    await render(hbs`<NrgAppbar/>`);

    assert.dom('.header.item').hasText('test title');
  });

  test('non-production environments display', async function (assert) {
    class ApplicationServiceStub extends Service {
      environmentConfig = {
        'ember-nrg-ui': {
          productionEnvironments: ['bob'],
        },
      };
    }
    this.owner.register('service:application', ApplicationServiceStub);
    await render(hbs`<NrgAppbar />`);
    assert.dom('.environment-title').hasText('PROD');
  });

  test('production evironment should not display', async function (assert) {
    class ApplicationServiceStub extends Service {
      environmentConfig = {
        'ember-nrg-ui': {
          productionEnvironments: ['prod'],
        },
      };
    }
    this.owner.register('service:application', ApplicationServiceStub);
    await render(hbs`<NrgAppbar />`);
    assert.dom('.environment-title').doesNotExist();
  });
});
