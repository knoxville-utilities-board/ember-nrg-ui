import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | nrg-datetime', function(hooks) {
  const testDate = new Date(2013, 2, 3, 4, 10);
  setupRenderingTest(hooks);

  test('validation shows when form is invalid', async function(assert) {
    await render(hbs`{{date-time-test didValidate=true required=true initializeDate=false}}`);
    assert.equal(findAll('.field.error').length, 1);
  });

  test('validation doesn\'t show when field is blank', async function(assert) {
    await render(hbs`{{date-time-test didValidate=true required=false initializeDate=false}}`);
    assert.equal(findAll('.field.error').length, 0);
  });

  test('it renders (empty)', async function(assert) {
    await render(hbs`{{nrg-datetime initializeDate=false}}`);

    assert.equal(find('input').value, '');
  });

  test('it renders (datetime)', async function(assert) {
    this.dateValue = testDate;
    await render(hbs`{{nrg-datetime value=dateValue type='datetime'}}`);

    assert.equal(find('input').value, 'March 3, 2013 4:10 AM');
  });

  test('it renders (date)', async function(assert) {
    this.dateValue = testDate;
    await render(hbs`{{nrg-datetime value=dateValue}}`);

    assert.equal(find('input').value, 'March 3, 2013');
  });

  test('it renders (time)', async function(assert) {
    this.dateValue = testDate;
    await render(hbs`{{nrg-datetime value=dateValue type='time'}}`);

    assert.equal(find('input').value, '4:10 AM');
  });

  test('it renders (block)', async function(assert) {
    await render(hbs`
      {{#nrg-datetime}}
        <span>template block text</span>
      {{/nrg-datetime}}
    `);
    assert.equal(find('*').textContent.trim(), 'template block text');
  });
});
