import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('Integration | Component | nrg-datetime', function (hooks) {
  const testDate = new Date(2013, 2, 3, 4, 10);
  setupRenderingTest(hooks);

  test('it renders (empty)', async function (assert) {
    await render(hbs`<NrgDatetime />`);

    assert.dom('input').hasValue('');
  });

  test('it renders (with default value)', async function (assert) {
    await render(
      hbs`<NrgDatetime @model={{this}} @valuePath="dateValue" @useDefaultValue={{true}} />`
    );

    assert.dom('input').hasValue();
  });

  test('it renders (datetime)', async function (assert) {
    this.dateValue = testDate;
    await render(
      hbs`<NrgDatetime @model={{this}} @valuePath="dateValue" @type="datetime" />`
    );

    assert.dom('input').hasValue('March 3, 2013 4:10 AM');
  });

  test('it renders (date)', async function (assert) {
    this.dateValue = testDate;
    await render(hbs`<NrgDatetime @model={{this}} @valuePath="dateValue" />`);

    assert.dom('input').hasValue('March 3, 2013');
  });

  test('it renders (time)', async function (assert) {
    this.dateValue = testDate;
    await render(
      hbs`<NrgDatetime @model={{this}} @valuePath="dateValue" @type="time" />`
    );

    assert.dom('input').hasValue('4:10 AM');
  });

  test('it renders (block)', async function (assert) {
    await render(hbs`
      <NrgDatetime>
        <span>template block text</span>
      </NrgDatetime>
    `);
    assert.dom('*').hasText('template block text');
  });
});
