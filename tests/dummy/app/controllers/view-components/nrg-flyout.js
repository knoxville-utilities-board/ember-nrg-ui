import { action, set } from '@ember/object';
import Controller from '@ember/controller';

export default class ViewComponentsNrgFlyoutController extends Controller {
  @action
  setProperty(key, value) {
    set(this, key, value);
  }
}
