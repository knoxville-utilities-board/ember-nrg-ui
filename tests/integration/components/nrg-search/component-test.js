import { fillIn, find, findAll, render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('Integration | Component | nrg-search', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.selected = {
      header: 'header',
    };
    await render(hbs`<NrgSearch @selected={{selected}} />`);
    assert.equal(find('input').value, 'header');
  });

  test('value is populated after it is loaded', async function(assert) {
    this.selected = {
      isLoading: true,
    };
    await render(hbs`<NrgSearch @selected={{selected}} />`);
    assert.equal(find('input').value, '');
    this.set('selected.header', 'header');
    this.set('selected.isLoading', false);
    assert.equal(find('input').value, 'header');
  });

  test('results do not display when loading', async function(assert) {
    this.items = [{}];
    this.loading = true;
    await render(hbs`<NrgSearch @items={{items}} @loading={{loading}} />`);
    assert.notOk(findAll('.results').length);
  });

  test('query action is sent', async function(assert) {
    this.queryAction = searchString => {
      assert.equal(searchString, 'search');
    };
    await render(hbs`<NrgSearch @query={{action queryAction}} />`);
    await fillIn('input', 'search');
  });
});
