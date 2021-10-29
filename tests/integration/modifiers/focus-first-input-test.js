import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Modifier | focus-first-input', function (hooks) {
  setupRenderingTest(hooks);

  // Replace this with your real tests.
  test('it renders', async function (assert) {
    await render(
      hbs`<div {{focus-first-input}}><input id="test-first-input" type="text"/><input id="test-second-input" type="text"/></div>`
    );
    const firstInput = document.querySelector('#test-first-input');
    const secondInput = document.querySelector('#test-second-input');
    assert.equal(document.activeElement, firstInput);
    assert.notEqual(document.activeElement, secondInput);
  });
});
