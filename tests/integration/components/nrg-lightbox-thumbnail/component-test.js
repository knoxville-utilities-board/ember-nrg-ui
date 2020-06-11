import { find, render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('Integration | Component | nrg-lightbox-thumbnail', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.photo = {
      url: 'http://someUrl',
    };
    await render(hbs`<NrgLightboxThumbnail @photo={{photo}} />`);
    assert.equal(find('img').getAttribute('src'), 'http://someUrl');
  });
});
