import { click, fillIn, findAll, render, settled } from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';
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

  test('action fires when item is clicked', async function (assert) {
    assert.expect(1);
    this.query = () => {
      return [
        {
          header: 'header',
        },
      ];
    };
    this.onChange = (item) => {
      assert.deepEqual(item, this.query()[0]);
    };
    await render(
      hbs`<NrgSearch @query={{this.query}} @onChange={{this.onChange}} />`
    );
    await fillIn('input', 'querystring');
    await click('.result');
  });

  test("action doesn't fire when disabled item is clicked", async function (assert) {
    assert.expect(1);
    this.query = () => {
      return [
        {
          header: 'header',
        },
        {
          header: 'header',
          disabled: true,
        },
      ];
    };
    this.onChange = () => {
      assert.notOk(true);
    };
    await render(
      hbs`<NrgSearch @query={{this.query}} @onChange={{this.onChange}} />`
    );
    await fillIn('input', 'querystring');

    assert.dom('.result:last-child').hasClass('disabled');

    await click('.result.disabled');
  });

  test('search icon is hidden', async function (assert) {
    await render(hbs`<NrgSearch @hideSearchIcon={{true}} />`);
    assert.dom('i.search.icon').doesNotExist();
  });

  test('field can be marked readonly', async function (assert) {
    await render(hbs`<NrgSearch @readonly={{true}} />`);

    assert.dom('.search input').hasAttribute('readonly');
    assert.dom('.search input').isNotDisabled();
  });

  test('input value updates dynamically', async function (assert) {
    class Model {
      @tracked
      valuePath = 'prop1';

      prop1 = 'value1';
      prop2 = 'value2';
    }

    this.model = new Model();

    await render(
      hbs`<NrgSearch @model={{this.model}} @valuePath={{this.model.valuePath}} />`
    );

    assert.dom('input').hasValue('value1');

    this.model.valuePath = 'prop2';
    await settled();

    assert.dom('input').hasValue('value2');
  });
});
