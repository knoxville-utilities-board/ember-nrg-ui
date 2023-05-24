import { action, set } from '@ember/object';
import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class ViewComponentsNrgFlyoutController extends Controller {
  @tracked
  flyoutOpen1 = false;

  @tracked
  flyoutOpen2 = false;

  @action
  setProperty(key, value) {
    set(this, key, value);
  }
}
