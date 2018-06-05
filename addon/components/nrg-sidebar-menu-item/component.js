import Component from '@ember/component';
import layout from './template';
import {
  readOnly
} from '@ember/object/computed';

export default Component.extend({
  layout,

  tagName: '',

  isVisible: readOnly('item.isShownInSidebar'),
});
