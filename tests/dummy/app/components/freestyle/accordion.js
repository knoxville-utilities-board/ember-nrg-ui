import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { A } from '@ember/array';

const FLASH_TIMEOUT = 1000;
const flashOptions = {
  timeout: FLASH_TIMEOUT,
  showProgress: false,
};

export default class FreestyleAccordionComponent extends Component {
  items = [
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

  @service
  flashMessages;

  @tracked
  exclusive = true;

  @tracked
  forceOpen = false;

  @tracked
  openItems = A();

  @tracked
  _icon;

  @tracked
  rightIcon = false;

  @tracked
  basic = false;

  @tracked
  styled = false;

  @tracked
  fluid = false;

  get icon() {
    if (this._icon == 'false') {
      return false;
    }

    return this._icon || undefined;
  }

  get displayItems() {
    const { openItems } = this;
    return this.items.map((item) => {
      return {
        item,
        isActive: openItems.includes(item),
      };
    });
  }

  @action
  toggleItem(item) {
    if (this.openItems.includes(item)) {
      this.openItems.removeObject(item);
    } else {
      this.openItems.pushObject(item);
    }
  }

  @action
  itemClicked(item) {
    this.flashMessages.info(`'${item.title}' clicked`, flashOptions);
  }

  @action
  itemOpened(item) {
    this.flashMessages.success(`'${item.title}' opened`, flashOptions);
  }

  @action
  itemClosed(item) {
    this.flashMessages.error(`'${item.title}' closed`, flashOptions);
  }
}
