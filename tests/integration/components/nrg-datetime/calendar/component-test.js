import {
  click,
  find,
  findAll,
  focus,
  render,
  triggerKeyEvent
} from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import dayjs from 'dayjs';
import { module, test } from 'qunit';

module('Integration | Component | nrg-datetime/calendar', function(hooks) {
  setupRenderingTest(hooks);

  test('use arrow key to move to previous day', async function(assert) {
    this.onSelect = function(date) {
      const expectedDate = dayjs().subtract(1, 'day');
      assert.ok(expectedDate.isSame(date, 'day'));
    };
    await render(hbs`<NrgDatetime::Calendar @type="date" @onSelect={{action this.onSelect}} />`);
    await focus('.ui.popup.calendar');
    await triggerKeyEvent('.ui.popup.calendar', 'keydown', 'ArrowLeft');
    await triggerKeyEvent('.ui.popup.calendar', 'keydown', 'Enter');
  });

  test('maxDate limits selection', async function(assert) {
    const expectedDate = dayjs();
    this.onSelect = function(date) {
      assert.ok(expectedDate.isSame(date, 'day'));
    };

    this.today = expectedDate.clone();
    await render(hbs`<NrgDatetime::Calendar @type="date" @maxDate={{today}} @onSelect={{action this.onSelect}} />`);
    await focus('.ui.popup.calendar');
    await triggerKeyEvent('.ui.popup.calendar', 'keydown', 'ArrowRight');
    await triggerKeyEvent('.ui.popup.calendar', 'keydown', 'Enter');
  });

  test('minDate limits selection', async function(assert) {
    const expectedDate = dayjs();
    this.onSelect = function(date) {
      assert.ok(expectedDate.isSame(date, 'day'));
    };

    this.today = expectedDate.clone();
    await render(hbs`<NrgDatetime::Calendar @type="date" @minDate={{today}} @onSelect={{action this.onSelect}} />`);
    await focus('.ui.popup.calendar');
    await triggerKeyEvent('.ui.popup.calendar', 'keydown', 'ArrowLeft ');
    await triggerKeyEvent('.ui.popup.calendar', 'keydown', 'Enter');
  });

  test('disabled dates are not navigable', async function(assert) {
    const expectedDate = dayjs({
      day: 20,
      month: 1,
      year: 2020,
    });
    this.onSelect = function(date) {
      assert.ok(expectedDate.isSame(date, 'day'));
    };
    this.isDateDisabled = function(date) {
      return dayjs(date).day() === 3;
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
  });

  test('disabled dates are not clickable', async function(assert) {
    const expectedDate = dayjs({
      day: 20,
      month: 1,
      year: 2020,
    });
    this.onSelect = function(date) {
      assert.ok(expectedDate.isSame(date, 'day'));
    };
    this.isDateDisabled = function(date) {
      return dayjs(date).day() === 3;
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
  });

  test('previous month\'s dates are clickable', async function(assert) {
    const expectedDate = dayjs({
      day: 30,
      month: 5,
      year: 2020
    });
    this.value = dayjs({
      day: 31,
      month: 6,
      year: 2020,
    });
    this.onSelect = function(date) {
      assert.ok(expectedDate.isSame(date, 'day'));
    };
    await render(
      hbs`<NrgDatetime::Calendar @type="date" @value={{value}} @onSelect={{action this.onSelect}} />`
    );
    await focus('.ui.popup.calendar');
    const availableDateCells = findAll('.ui.calendar tbody td.link');
    await click(availableDateCells[2]);
  });

  test('next month\'s dates are clickable', async function(assert) {
    const expectedDate = dayjs({
      day: 6,
      month: 2,
      year: 2020
    });
    this.value = dayjs({
      day: 15,
      month: 1,
      year: 2020,
    });
    this.onSelect = function(date) {
      assert.ok(expectedDate.isSame(date, 'day'));
    };
    await render(
      hbs`<NrgDatetime::Calendar @type="date" @value={{value}} @onSelect={{action this.onSelect}} />`
    );
    await focus('.ui.popup.calendar');
    const availableDateCells = findAll('.ui.calendar tbody td.link');
    await click(availableDateCells[40]);
  });

  test('go through full date time workflow', async function(assert) {
    this.onSelect = function(date) {
      const expectedDate = dayjs()
        .add(1, 'day')
        .hour(0)
        .minute(55);
      assert.ok(expectedDate.isSame(date, 'minute'));
    };
    await render(hbs`<NrgDatetime::Calendar @type="datetime" @onSelect={{action this.onSelect}} />`);
    await focus('.ui.popup.calendar');
    await triggerKeyEvent('.ui.popup.calendar', 'keydown', 'ArrowRight');
    await triggerKeyEvent('.ui.popup.calendar', 'keydown', 'Enter');
    await click('tbody tr:first-child td:first-child');
    await click('tbody tr:nth-child(4) td:last-child');
  });

  test('go through time only workflow', async function(assert) {
    this.onSelect = function(date) {
      const expectedDate = dayjs()
        .hour(0)
        .minute(55);
      assert.ok(expectedDate.isSame(date, 'minute'));
    };
    await render(hbs`<NrgDatetime::Calendar @type="time" @onSelect={{action this.onSelect}} />`);
    await focus('.ui.popup.calendar');
    await click('tbody tr:first-child td:first-child');
    await click('tbody tr:nth-child(4) td:last-child');
  });

  test('header navigation changes indexes', async function(assert) {
    this.onSelect = function(date) {
      const expectedDate = dayjs().add(1, 'month');
      assert.ok(expectedDate.isSame(date, 'day'));
    };
    await render(hbs`<NrgDatetime::Calendar @type="date" @onSelect={{action this.onSelect}} />`);
    await focus('.ui.popup.calendar');
    await click('.chevron.right.icon');
    await triggerKeyEvent('.ui.popup.calendar', 'keydown', 'Enter');
  });

  test('today/now button hidden if after max date', async function(assert) {
    this.value = dayjs({
      day: 20,
      month: 1,
      year: 2020,
    });
    this.maxDate = this.value.clone();
    await render(hbs`<NrgDatetime::Calendar @type="date" @maxDate={{maxDate}} @value={{value}} />`);
    assert.dom('tbody tr:nth-child(7)').doesNotExist();
  });

  test('no time is selected if no value is passed in', async function(assert) {
    await render(hbs`<NrgDatetime::Calendar @type="time" @value={{value}} />`);
    
    const selected = findAll('div.calendar.visible td.active');
    assert.equal(selected.length, 0);
  });

  test('no date is selected if no value is passed in', async function(assert) {
    await render(hbs`<NrgDatetime::Calendar @type="date" @value={{value}} />`);
    
    const selected = findAll('div.calendar.visible td.active');
    assert.equal(selected.length, 0);
  });

  test('isDateDisabled can use precision', async function(assert) {
    const hour = 8;
    const minute = 15;
    const minDate = dayjs({
      hour,
      minute
    });

    this.isDateDisabled = function(date, precision) {
      if (precision == 'hour') {
        return date.isBefore(minDate, precision);
      }
      return date.isSameOrBefore(minDate, precision);
    }
    
    await render(hbs`<NrgDatetime::Calendar @type="time" @isDateDisabled={{isDateDisabled}} />`);

    await click(findAll('tbody tr td.link')[hour]);

    const lastDisabledTime = findAll('tbody tr td.link.disabled')[minute / 5];
    assert.dom(lastDisabledTime).hasClass('disabled');
  });
});
