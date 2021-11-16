import Service from '@ember/service';
import { find, render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('Integration | Component | nrg-context-menu', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    class ContextServiceStub extends Service {
      contextItems = [
        {
          label: 'item1',
        },
        {
          label: 'item2',
        },
      ];
    }
    this.owner.register('service:context-menu', ContextServiceStub);

    await render(hbs`<NrgContextMenu />`);

    const text = find('*').textContent;
    assert.ok(/item1/.test(text));
    assert.ok(/item2/.test(text));
  });
});
