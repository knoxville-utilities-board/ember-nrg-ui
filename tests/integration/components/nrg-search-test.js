import { fillIn, findAll, render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('Integration | Component | nrg-search', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders selected value', async function (assert) {
    this.selected = {
      header: 'header',
    };
    await render(hbs`<NrgSearch @model={{this}} @valuePath="selected" />`);
    assert.dom('input').hasValue('header');
  });

  test('it renders selected string value', async function (assert) {
    this.selected = 'SomeValue';
    await render(hbs`<NrgSearch @model={{this}} @valuePath="selected" />`);
    assert.dom('input').hasValue('SomeValue');
  });

  test('query method is called with querystring', async function (assert) {
    assert.expect(1);
    this.query = (querystring) => {
      assert.strictEqual(querystring, 'search');
    };
    await render(hbs`<NrgSearch @query={{this.query}} />`);
    await fillIn('input', 'search');
  });

  test('results display after query', async function (assert) {
    this.query = () => {
      return [{}];
    };
    await render(hbs`<NrgSearch @searchTimeout={{0}} @query={{this.query}} />`);
    await fillIn('input', 'querystring');
    assert.ok(findAll('.results').length);
  });

  test('results do not display when loading', async function (assert) {
    this.query = () => {
      return [{}];
    };
    await render(
      hbs`<NrgSearch @searchTimeout={{0}} @query={{this.query}} @loading={{true}} />`
    );
    await fillIn('input', 'querystring');
    assert.notOk(findAll('.results').length);
  });
});
