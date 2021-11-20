import {
  click,
  findAll,
  focus,
  render,
  triggerKeyEvent,
} from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';
import { module, test } from 'qunit';

module('Integration | Component | nrg-datetime/calendar', function (hooks) {
  setupRenderingTest(hooks);

  test('use arrow key to move to previous day', async function (assert) {
    this.set('value', moment());

    this.onSelect = function (date) {
      this.set('value', moment(date));
    };
    await render(
      hbs`<NrgDatetime::Calendar @type="date" @value={{this.value}} @onSelect={{this.onSelect}} />`
    );
    await focus('.ui.popup.calendar');
    await triggerKeyEvent('.ui.popup.calendar', 'keydown', 'ArrowLeft');
    await triggerKeyEvent('.ui.popup.calendar', 'keydown', 'Enter');
    const expectedDate = moment().subtract(1, 'day');
    assert.ok(expectedDate.isSame(this.value, 'day'));
  });

  test('maxDate limits selection', async function (assert) {
    this.set('value', moment());
    const expectedDate = moment();

    this.onSelect = function (date) {
      this.set('value', moment(date));
    };
    await render(
      hbs`<NrgDatetime::Calendar @type="date" @value={{this.value}} @maxDate={{this.value}} @onSelect={{this.onSelect}} />`
    );
    await focus('.ui.popup.calendar');
    await triggerKeyEvent('.ui.popup.calendar', 'keydown', 'ArrowRight');
    await triggerKeyEvent('.ui.popup.calendar', 'keydown', 'Enter');
    assert.ok(expectedDate.isSame(this.value, 'day'));
  });

  test('minDate limits selection', async function (assert) {
    this.set('value', moment());
    const expectedDate = moment();

    this.onSelect = function (date) {
      this.set('value', moment(date));
    };

    await render(
      hbs`<NrgDatetime::Calendar @type="date" @value={{this.value}} @minDate={{this.value}} @onSelect={{this.onSelect}} />`
    );
    await focus('.ui.popup.calendar');
    await triggerKeyEvent('.ui.popup.calendar', 'keydown', 'ArrowLeft');
    await triggerKeyEvent('.ui.popup.calendar', 'keydown', 'Enter');
    assert.ok(expectedDate.isSame(this.value, 'day'));
  });

  test('disabled dates are not navigable', async function (assert) {
    this.set('value', moment());

    this.onSelect = function (date) {
      this.set('value', moment(date));
    };
    const expectedDate = moment({
      day: 20,
      month: 1,
      year: 2020,
    });
    this.isDateDisabled = function (date) {
      return moment(date).day() === 3;
    };
    this.minDate = expectedDate.clone().day(1);
    this.maxDate = expectedDate.clone().day(5);
    this.value = expectedDate.clone().toDate();
    await render(
      hbs`<NrgDatetime::Calendar @type="date" @value={{value}} @minDate={{minDate}} @maxDate={{maxDate}} @isDateDisabled={{isDateDisabled}} @onSelect={{action this.onSelect}} />`
    );
    await focus('.ui.popup.calendar');
    await triggerKeyEvent('.ui.popup.calendar', 'keydown', 'ArrowLeft');
    await triggerKeyEvent('.ui.popup.calendar', 'keydown', 'Enter');
    assert.ok(expectedDate.isSame(this.value, 'day'));
  });

  test('disabled dates are not clickable', async function (assert) {
    this.set('value', moment());

    this.onSelect = function (date) {
      this.set('value', moment(date));
    };
    const expectedDate = moment({
      day: 20,
      month: 1,
      year: 2020,
    });
    this.isDateDisabled = function (date) {
      return moment(date).day() === 3;
    };
    this.minDate = expectedDate.clone().day(1);
    this.maxDate = expectedDate.clone().day(5);
    this.value = expectedDate.clone().toDate();
    await render(
      hbs`<NrgDatetime::Calendar @type="date" @value={{value}} @minDate={{minDate}} @maxDate={{maxDate}} @isDateDisabled={{isDateDisabled}} @onSelect={{action this.onSelect}} />`
    );
    await focus('.ui.popup.calendar');
    const availableDateCells = findAll('.ui.calendar tbody td.link');
    await click(availableDateCells[24]);
    assert.ok(expectedDate.isSame(this.value, 'day'));
  });

  test("previous month's dates are clickable", async function (assert) {
    this.set('value', moment());

    this.onSelect = function (date) {
      this.set('value', moment(date));
    };
    const expectedDate = moment({
      day: 30,
      month: 5,
      year: 2020,
    });
    this.value = moment({
      day: 31,
      month: 6,
      year: 2020,
    });
    await render(
      hbs`<NrgDatetime::Calendar @type="date" @value={{this.value}} @onSelect={{this.onSelect}} />`
    );
    await focus('.ui.popup.calendar');
    const availableDateCells = findAll('.ui.calendar tbody td.link');
    await click(availableDateCells[2]);
    assert.ok(expectedDate.isSame(this.value, 'day'));
  });

  test("next month's dates are clickable", async function (assert) {
    this.set('value', moment());

    this.onSelect = function (date) {
      this.set('value', moment(date));
    };
    const expectedDate = moment({
      day: 6,
      month: 2,
      year: 2020,
    });
    this.value = moment({
      day: 15,
      month: 1,
      year: 2020,
    });
    await render(
      hbs`<NrgDatetime::Calendar @type="date" @value={{this.value}} @onSelect={{this.onSelect}} />`
    );
    await focus('.ui.popup.calendar');
    const availableDateCells = findAll('.ui.calendar tbody td.link');
    await click(availableDateCells[40]);
    assert.ok(expectedDate.isSame(this.value, 'day'));
  });

  test('go through full date time workflow', async function (assert) {
    this.set('value', moment());

    this.onSelect = function (date) {
      this.set('value', moment(date));
    };
    await render(
      hbs`<NrgDatetime::Calendar @type="datetime" @value={{this.value}} @onSelect={{this.onSelect}} />`
    );
    await focus('.ui.popup.calendar');
    await triggerKeyEvent('.ui.popup.calendar', 'keydown', 'ArrowRight');
    await triggerKeyEvent('.ui.popup.calendar', 'keydown', 'Enter');
    await click('tbody tr:first-child td:first-child');
    await click('tbody tr:nth-child(4) td:last-child');
    const expectedDate = moment().add(1, 'day').hour(0).minute(55);
    assert.ok(expectedDate.isSame(this.value, 'minute'));
  });

  test('go through time only workflow', async function (assert) {
    this.set('value', moment());

    this.onSelect = function (date) {
      this.set('value', moment(date));
    };
    await render(
      hbs`<NrgDatetime::Calendar @type="time" @value={{this.value}} @onSelect={{this.onSelect}} />`
    );
    await focus('.ui.popup.calendar');
    await click('tbody tr:first-child td:first-child');
    await click('tbody tr:nth-child(4) td:last-child');
    const expectedDate = moment().hour(0).minute(55);
    assert.ok(expectedDate.isSame(this.value, 'minute'));
  });

  test('header navigation changes indexes', async function (assert) {
    this.set('value', moment());

    this.onSelect = function (date) {
      this.set('value', moment(date));
    };
    await render(
      hbs`<NrgDatetime::Calendar @type="date" @value={{this.value}} @onSelect={{this.onSelect}} />`
    );
    await focus('.ui.popup.calendar');
    await click('.chevron.right.icon');
    await triggerKeyEvent('.ui.popup.calendar', 'keydown', 'Enter');
    const expectedDate = moment().add(1, 'month');
    assert.ok(expectedDate.isSame(this.value, 'day'));
  });

  test('today/now button hidden if after max date', async function (assert) {
    this.value = moment({
      day: 20,
      month: 1,
      year: 2020,
    });
    this.maxDate = this.value.clone();
    await render(
      hbs`<NrgDatetime::Calendar @type="date" @value={{this.value}} @maxDate={{this.maxDate}} />`
    );
    assert.dom('tbody tr:nth-child(7)').doesNotExist();
  });

  test('no time is selected if no value is passed in', async function (assert) {
    await render(hbs`<NrgDatetime::Calendar @type="time"/>`);

    const selected = findAll('div.calendar.visible td.active');
    assert.equal(selected.length, 0);
  });

  test('no date is selected if no value is passed in', async function (assert) {
    await render(hbs`<NrgDatetime::Calendar @type="date" />`);

    const selected = findAll('div.calendar.visible td.active');
    assert.equal(selected.length, 0);
  });

  test('isDateDisabled can use precision', async function (assert) {
    const hour = 8;
    const minute = 15;
    const minDate = moment({
      hour,
      minute,
    });
    this.set('value', minDate);

    this.isDateDisabled = function (date, precision) {
      if (precision == 'hour') {
        return date.isBefore(minDate, precision);
      }
      return date.isSameOrBefore(minDate, precision);
    };

    await render(
      hbs`<NrgDatetime::Calendar @type="time" @value={{this.value}} @isDateDisabled={{this.isDateDisabled}} />`
    );

    await click(findAll('tbody tr td.link')[hour]);

    const lastDisabledTime = findAll('tbody tr td.link.disabled')[minute / 5];
    assert.dom(lastDisabledTime).hasClass('disabled');
  });
});
