//BEGIN-SNIPPET focus-first-mixin
import Component from '@ember/component';
import FocusFirstInputMixin from 'ember-nrg-ui/mixins/focus-first-input';

export default Component.extend(FocusFirstInputMixin, {
  classNames: ['ui', 'segment'],
});
//END-SNIPPET
