import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | progress-bar', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<NrgProgressBar @progressValue={{1}} @progressMax={{5}}/>`);

    assert.dom(this.element).hasText('Step 1 of 5');
  });
});
