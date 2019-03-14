import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { A } from '@ember/array';

module('Integration | Helper | list-group-header', function(hooks) {
  hooks.beforeEach(function() {
    this.items = A([
      {
        name: 'Bobby',
      },
      {
        name: 'Bobby Jr.',
      },
    ]);
    this.groupHeaderHandler = function(item) {
      return item.name.substr(0, 1);
    };
  });

  setupRenderingTest(hooks);

  test('label is show correctly', async function(assert) {
    this.i = 0;
    await render(hbs`{{list-group-header items i groupHeaderHandler}}`);
    assert.equal(
      this.$()
        .text()
        .trim(),
      'B'
    );
  });

  test('label is not show for the second item', async function(assert) {
    this.i = 1;
    await render(hbs`{{list-group-header items i groupHeaderHandler}}`);
    assert.equal(
      this.$()
        .text()
        .trim(),
      ''
    );
  });
});
