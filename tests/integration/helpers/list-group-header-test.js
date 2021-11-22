import { A } from '@ember/array';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('Integration | Helper | list-group-header', function (hooks) {
  hooks.beforeEach(function () {
    this.items = A([
      {
        name: 'Bobby',
      },
      {
        name: 'Bobby Jr.',
      },
    ]);
    this.groupHeaderHandler = function (item) {
      return item.name.substr(0, 1);
    };
  });

  setupRenderingTest(hooks);

  test('label is shown correctly', async function (assert) {
    this.i = 0;
    await render(
      hbs`<div>{{list-group-header items i groupHeaderHandler}}</div>`
    );
    assert.dom('div').hasText('B');
  });

  test('label is not shown for the second item', async function (assert) {
    this.i = 1;
    await render(
      hbs`<div>{{list-group-header items i groupHeaderHandler}}</div>`
    );
    assert.dom('div').hasText('');
  });
});
