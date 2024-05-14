import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | nrg-side-by-side/placeholder',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders (inline)', async function (assert) {
      await render(hbs`<NrgSideBySide::Placeholder />`);

      assert.dom('div.ui.header').hasText('Please select an item');

      await render(
        hbs`<NrgSideBySide::Placeholder @text="Please select an item from the list" />`
      );

      assert
        .dom('div.ui.header')
        .hasText('Please select an item from the list');
    });

    test('it renders (block)', async function (assert) {
      await render(hbs`
      <NrgSideBySide::Placeholder>
        template block text
      </NrgSideBySide::Placeholder>
    `);

      assert.dom('* > *', this.element).doesNotExist();
      assert.dom().hasText('template block text');

      await render(hbs`
      <NrgSideBySide::Placeholder @text="some other text">
        template block text
      </NrgSideBySide::Placeholder>
    `);

      assert.dom('* > *', this.element).doesNotExist();
      assert.dom().doesNotHaveTextContaining('some other text');
      assert.dom().hasText('template block text');
    });
  }
);
