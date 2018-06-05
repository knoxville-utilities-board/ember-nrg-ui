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

module('Integration | Component | nrg-sidebar-menu-item', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.clickedAction = () => {
      // Stub function
    };
    this.sidebarAction = () => {
      // Stub function
    };
    await render(hbs `{{nrg-sidebar-menu-item clickedLink=(action clickedAction) sidebarAction=(action sidebarAction)}}`);

    assert.equal(this.element.textContent.trim(), '');
  });
});
