import { module, test } from 'qunit';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { click, findAll, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | nrg-accordion', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.items = [
      {
        title: 'Foo',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus faucibus ligula quis metus lobortis, at tincidunt tortor condimentum. Vivamus fermentum tortor non eros vestibulum, id viverra mi congue. Donec dapibus nisi id magna dictum, ac sodales nulla varius. Curabitur varius sapien quis pellentesque egestas. Vestibulum mattis risus nisi, sit amet convallis sapien maximus at.',
      },
      {
        title: 'Bar',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel justo consectetur, facilisis elit id, efficitur erat. Curabitur dignissim maximus pellentesque. Nunc id bibendum orci, sit amet elementum sem. In sed justo enim. Nam suscipit mattis consequat. Etiam ipsum nibh, mollis et nisi id, ultricies lobortis neque.',
      },
      {
        title: 'Baz',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id ultrices magna, ut imperdiet ipsum. Proin commodo arcu magna, sit amet scelerisque nibh volutpat eget. Aliquam efficitur pulvinar luctus. Nunc accumsan, mauris quis porttitor tincidunt, sapien dolor luctus mi, in ultricies libero ligula ac ipsum.',
      },
    ];
  });

  test('it renders', async function (assert) {
    await render(hbs`<NrgAccordion @items={{this.items}} />`);

    const titles = findAll('div.title');
    const contents = findAll('div.content');

    for (let i = 0; i < this.items.length; i++) {
      const { title, content } = this.items[i];
      const titleEl = titles[i];
      const contentEl = contents[i];

      assert.dom(titleEl).hasText(title);
      assert.dom(contentEl).hasText(content);
    }
  });

  test('icon renders', async function (assert) {
    await render(hbs`<NrgAccordion @items={{this.items}} />`);

    let titles = findAll('div.title');
    for (const title of titles) {
      assert.dom('i', title).hasClass('dropdown');
    }

    await render(hbs`<NrgAccordion @items={{this.items}} @icon="check" />`);

    titles = findAll('div.title');
    for (const title of titles) {
      assert.dom('i', title).hasClass('check').doesNotHaveClass('dropdown');
    }

    await render(
      hbs`<NrgAccordion @items={{this.items}} @rightIcon={{true}} />`
    );

    titles = findAll('div.title');
    for (const title of titles) {
      assert.dom('i', title).hasClass('dropdown').hasClass('right');
    }
  });

  test('clicking on the title or icon works', async function (assert) {
    this.items = this.items.slice(0, 1);
    await render(hbs`<NrgAccordion @items={{this.items}} />`);

    await click('div.title');

    assert.dom('div.title').hasClass('active');
    assert.dom('div.content').hasClass('active');

    await render(hbs`<NrgAccordion @items={{this.items}} />`);

    await click('div.title > i');

    assert.dom('div.title').hasClass('active');
    assert.dom('div.content').hasClass('active');
  });

  test('`exclusive` option works', async function (assert) {
    let title1, title3;
    let content1, content3;

    await render(
      hbs`<NrgAccordion @items={{this.items}} @exclusive={{true}} />`
    );

    [title1] = findAll('div.title');

    await click(title1);

    [title1, , title3] = findAll('div.title');
    [content1] = findAll('div.content');

    assert.dom(title1).hasClass('active');
    assert.dom(content1).hasClass('active');

    await click(title3);

    [title1, , title3] = findAll('div.title');
    [content1, , content3] = findAll('div.content');

    assert.dom(title1).doesNotHaveClass('active');
    assert.dom(content1).doesNotHaveClass('active');
    assert.dom(title3).hasClass('active');
    assert.dom(content3).hasClass('active');

    await render(
      hbs`<NrgAccordion @items={{this.items}} @exclusive={{false}} />`
    );

    [title1] = findAll('div.title');

    await click(title1);

    [title1, , title3] = findAll('div.title');
    [content1] = findAll('div.content');

    assert.dom(title1).hasClass('active');
    assert.dom(content1).hasClass('active');

    await click(title3);

    [title1, , title3] = findAll('div.title');
    [content1, , content3] = findAll('div.content');

    assert.dom(title1).hasClass('active');
    assert.dom(content1).hasClass('active');
    assert.dom(title3).hasClass('active');
    assert.dom(content3).hasClass('active');
  });

  test('`forceOpen` option works', async function (assert) {
    let title1, title2;
    let content1, content2;

    await render(
      hbs`<NrgAccordion @items={{this.items}} @forceOpen={{true}} @exclusive={{false}} />`
    );

    [title1] = findAll('div.title');

    await click(title1);

    [title1, title2] = findAll('div.title');
    [content1] = findAll('div.content');

    assert.dom(title1).hasClass('active');
    assert.dom(content1).hasClass('active');

    await click(title2);

    [title1, title2] = findAll('div.title');
    [content1, content2] = findAll('div.content');

    assert.dom(title1).hasClass('active');
    assert.dom(content1).hasClass('active');
    assert.dom(title2).hasClass('active');
    assert.dom(content2).hasClass('active');

    await click(title1);

    [title1, title2] = findAll('div.title');
    [content1, content2] = findAll('div.content');

    assert.dom(title1).doesNotHaveClass('active');
    assert.dom(content1).doesNotHaveClass('active');
    assert.dom(title2).hasClass('active');
    assert.dom(content2).hasClass('active');

    await click(title2);

    [title1, title2] = findAll('div.title');
    [content1, content2] = findAll('div.content');

    assert.dom(title1).doesNotHaveClass('active');
    assert.dom(content1).doesNotHaveClass('active');
    assert.dom(title2).hasClass('active');
    assert.dom(content2).hasClass('active');
  });

  test('actions work', async function (assert) {
    const expectedSteps = [
      'onOpen: Foo',
      'onClick: Foo',
      'onClose: Foo',
      'onOpen: Baz',
      'onClick: Baz',
      'onClose: Baz',
      'onClick: Baz',
    ];

    this.handleAction = (action, { title }) => {
      assert.step(`${action}: ${title}`);
    };

    await render(hbs`
      <NrgAccordion
        @items={{this.items}}
        @onClick={{fn this.handleAction "onClick"}}
        @onOpen={{fn this.handleAction "onOpen"}}
        @onClose={{fn this.handleAction "onClose"}}
      />`);

    await click('div.title:nth-of-type(1)');
    await click('div.title:nth-of-type(5)');
    await click('div.title:nth-of-type(5)');

    assert.verifySteps(expectedSteps);
  });

  test('`freeform` option works', async function (assert) {
    await render(hbs`
      <NrgAccordion @items={{this.items}} @exclusive={{false}} @freeform={{true}}>
        <:title as |item isActive|>
          <h3 class="ui header">
            <i class="{{if isActive 'minus' 'plus'}} icon" />
            {{item.title}}
          </h3>
        </:title>
        <:content as |item|>
          <em>
            {{item.content}}
          </em>
        </:content>
      </NrgAccordion>
    `);

    let titles = findAll('div.title');

    for (let i = 0; i < this.items.length; i++) {
      const { title } = this.items[i];
      const titleEl = titles[i];

      assert.dom(titleEl).doesNotHaveClass('active');
      assert.dom('h3', titleEl).hasText(title);
      assert.dom('h3 > i', titleEl).hasClass('plus');
    }

    await click('div.title:not(.active)');
    await click('div.title:not(.active)');
    await click('div.title:not(.active)');

    titles = findAll('div.title');
    let contents = findAll('div.content');

    for (let i = 0; i < this.items.length; i++) {
      const { content } = this.items[i];
      const titleEl = titles[i];
      const contentEl = contents[i];

      assert.dom(titleEl).hasClass('active');
      assert.dom('h3 > i', titleEl).hasClass('minus');
      assert.dom(contentEl).hasClass('active');
      assert.dom('em', contentEl).hasText(content);
    }
  });
});
