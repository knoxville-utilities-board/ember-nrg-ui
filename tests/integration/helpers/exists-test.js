import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | exists', function(hooks) {
  setupRenderingTest(hooks);

  test('item does exist', async function(assert) {
    const items = ['bobs', 'bob'];
    const item = items[1];

    this.set('items', items);
    this.set('item', item);

    await render(hbs`{{exists items item}}`);

    assert.dom(this.element).hasText('true');
  });

  test('item does not exist', async function(assert) {
    const items = ['bobs', 'bob'];
    const item = 'zach can code';

    this.set('items', items);
    this.set('item', item);

    await render(hbs`{{exists items item}}`);

    assert.dom(this.element).hasText('false');
  });
});
