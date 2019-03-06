import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import $ from 'jquery';

module('Integration | Component | nrg-sidebar', function(hooks) {
  hooks.afterEach(() => {
    // Clean up sidebar remenants
    $('.sidebar-modal').remove();
    $('.dimmed').removeClass('dimmed');
  });

  setupRenderingTest(hooks);

  test('sidebar is not visible', async function(assert) {
    await render(hbs`{{nrg-sidebar isOpen=false}}`);
    assert.equal($('.ui.sidebar.visible').length, 0);
  });

  test('sidebar is visible', async function(assert) {
    await render(hbs`{{nrg-sidebar isOpen=true}}`);
    assert.equal($('.ui.sidebar.visible').length, 1);
  });

  test('Item is rendered', async function(assert) {
    const sidebarMenuManager = this.owner.lookup('service:sidebarMenuManager');
    sidebarMenuManager.registerSidebarMenuItem({
      sidebarLabel: 'Home',
      routeName: '',
      isShownInSidebar: true,
    });
    await render(hbs`{{nrg-sidebar}}`);
    assert.ok(
      $('.ui.sidebar')
        .text()
        .trim()
        .match(/Home/)
    );
  });
});
