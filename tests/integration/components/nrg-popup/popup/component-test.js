import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | nrg-popup/popup', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.mouseEvent = function() {};
    await render(hbs`
      <NrgPopup::Popup @isOpen={{true}}>
        template block text
      </NrgPopup::Popup>
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });
});
