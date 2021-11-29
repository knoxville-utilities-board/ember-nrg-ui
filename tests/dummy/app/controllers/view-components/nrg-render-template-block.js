import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { htmlSafe } from '@ember/template';

export default class ViewComponentsNrgRenderTemplateBlockController extends Controller {
  @tracked
  clonedTemplateBlock;

  @tracked
  templateBody = '';

  @action
  cloneTemplate(node) {
    this.clonedTemplateBlock = htmlSafe(node.getInnerHTML());
  }

  @action
  changeTemplate() {
    this.templateBody = Math.random();
  }
}
