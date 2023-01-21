import { fillIn, render } from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('Integration | Component | nrg-list/header/search', function (hooks) {
  setupRenderingTest(hooks);

  test('action fires when value changes', async function (assert) {
    assert.expect(1);
    this.changedAction = function (value) {
      assert.strictEqual(value, 'value');
    };
    await render(
      hbs`<NrgList::Header::Search @onChange={{this.changedAction}} />`
    );
    await fillIn('input', 'value');
  });

  test('value updates when action fires', async function (assert) {
    class Model {
      @tracked
      value;
    }
    this.model = new Model();
    await render(
      hbs`<NrgList::Header::Search @model={{this}} @valuePath="model.value" />`
    );
    await fillIn('input', 'value');
    assert.strictEqual(this.model.value, 'value');
  });
});
