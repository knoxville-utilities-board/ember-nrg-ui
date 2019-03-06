import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | nrg-lightbox-thumbnail', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.photo = {
      url: 'http://someUrl',
    };
    await render(hbs`{{nrg-lightbox-thumbnail photo=photo}}`);
    assert.equal(this.$('img').attr('src'), 'http://someUrl');
  });
});
