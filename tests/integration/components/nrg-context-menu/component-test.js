import EmberObject from '@ember/object';
import { find, render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('Integration | Component | nrg-context-menu', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.contextServiceStub = EmberObject.create({
      contextItems: [
        {
          label: 'item1',
        },
        {
          label: 'item2',
        },
      ],
    });

    await render(
      hbs`{{nrg-context-menu title='' contextService=contextServiceStub}}`
    );

    const text = find('*').textContent;
    assert.ok(/item1/.test(text));
    assert.ok(/item2/.test(text));
  });
});
