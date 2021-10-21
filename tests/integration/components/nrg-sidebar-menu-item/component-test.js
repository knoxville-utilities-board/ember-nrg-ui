import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | nrg-sidebar-menu-item', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.sidebarAction = () => {
      // Stub function
    };
    this.clickedSidebarItem = () => {
      // Stub function
    };
    await render(
      hbs`<NrgSidebarMenuItem @clickedSidebarItem={{clickedSidebarItem}} @sidebarAction={{action sidebarAction}} />`
    );

    assert.dom(this.element).hasText('');
  });

  test('should fire action when clicked', async function(assert) {
    assert.expect(1);
    this.sidebarAction = () => {
      // Stub function
    };
    this.set('clickedAction', item => {
      assert.ok(item);
    });
    this.menuItem = {
      sidebarURL: 'http://www.kub.org/',
    };

    await render(
      hbs`<NrgSidebarMenuItem @item={{menuItem}} @clickedSidebarItem={{action clickedAction}} @sidebarAction={{action sidebarAction}} />`
    );
    await click('.item');
  });
});
