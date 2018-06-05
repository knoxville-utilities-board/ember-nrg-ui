import {
  module,
  test
} from 'qunit';
import {
  setupRenderingTest
} from 'ember-qunit';
import {
  render
} from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | nrg-search', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.selected = {
      header: 'header'
    };
    await render(hbs `{{nrg-search selected=selected}}`);
    assert.equal(this.$('input').val(), 'header');
  });

  test('value is populated after it is loaded', async function(assert) {
    this.selected = {
      isLoading: true,
    };
    await render(hbs `{{nrg-search selected=selected}}`);
    assert.equal(this.$('input').val(), '');
    this.set('selected.header', 'header');
    this.set('selected.isLoading', false);
    assert.equal(this.$('input').val(), 'header');
  });

  test('results do not display when loading', async function(assert) {
    this.items = [{}];
    this.loading = true;
    await render(hbs `{{nrg-search items=items loading=loading}}`);
    assert.notOk(this.$('.results').length);
  });

  test('query action is sent', async function(assert) {
    this.queryAction = searchString => {
      assert.equal(searchString, 'search');
    };
    await render(hbs `{{nrg-search query=(action queryAction)}}`);
    this.$('input').val('search').trigger('input');
  });
});
