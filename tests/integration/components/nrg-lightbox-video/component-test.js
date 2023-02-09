import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | nrg-lightbox-video', function (hooks) {
  setupRenderingTest(hooks);
  const URL = 'http://someUrl';

  test('it renders', async function (assert) {
    this.video = {
      url: URL,
    };

    await render(hbs`<NrgLightboxVideo @video={{video}} />`);
    assert.equal(find('source').getAttribute('src'), URL);
  });
});
