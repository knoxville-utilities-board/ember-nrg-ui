import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import dayjs from 'dayjs';

module('Integration | Helper | format-date', function (hooks) {
  setupRenderingTest(hooks);
  hooks.beforeEach(function () {
    this.set(
      'inputValue',
      dayjs({
        day: 20,
        month: 0,
        year: 2020,
        hour: 10,
        minute: 4,
      })
    );
  });

  test('Default format', async function (assert) {
    await render(hbs`{{format-date this.inputValue}}`);

    assert.dom(this.element).hasText('01/20/2020 10:04 AM');
  });

  test('Date format', async function (assert) {
    await render(hbs`{{format-date this.inputValue type="date"}}`);

    assert.dom(this.element).hasText('01/20/2020');
  });

  test('Time format', async function (assert) {
    await render(hbs`{{format-date this.inputValue type="time"}}`);

    assert.dom(this.element).hasText('10:04 AM');
  });

  test('Custom', async function (assert) {
    await render(hbs`{{format-date this.inputValue "YYYY"}}`);

    assert.dom(this.element).hasText('2020');
  });
});
