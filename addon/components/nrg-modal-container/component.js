import Component from '@ember/component';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import layout from './template';

export default Component.extend({
  layout,
  tagName: '',
  modalService: service('modal'),
  openModals: alias('modalService.items'),
});
