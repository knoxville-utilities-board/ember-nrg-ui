import Component from '@ember/component';
import layout from './template';
import Validation from 'ember-nrg-ui/mixins/validation';
import {
  computed,
  get,
  observer
} from '@ember/object';
import {
  and,
  or,
  not
} from '@ember/object/computed';
import {
  on
} from '@ember/object/evented'
import {
  EKFirstResponderOnFocusMixin,
  EKMixin,
  keyDown
} from 'ember-keyboard';
import {
  next
} from '@ember/runloop';
import $ from 'jquery';
import {
  task,
  timeout
} from 'ember-concurrency';

export default Component.extend(Validation, EKMixin, EKFirstResponderOnFocusMixin, {
  layout,

  classNames: ['ui', 'category', 'search', 'focus', 'box', 'inlined'],

  classNameBindings: ['fluid', '_loading:loading'],

  focused: false,

  fluid: true,

  placeholder: 'Search',

  items: null,

  loading: false,

  _loading: or('loading', 'updateDisplayValue.isRunning'),

  displayLabel: 'header',

  notLoading: not('_loading'),

  minCharacters: 1,

  activeItem: -1,

  selected: null,

  didInsertElement() {
    this._super(...arguments);
    this.createClickHandler();
  },

  willDestroyElement() {
    this._super(...arguments);
    this.removeWindowClickListener();
  },

  addWindowClickListener() {
    $(window).on('click', this.get('_clickHandler'));
  },

  removeWindowClickListener() {
    $(window).off('click', this.get('_clickHandler'));
  },

  createClickHandler() {
    this.set('_clickHandler', evt => {
      if (this.element !== evt.target) {
        this.set('focused', false);
        this.set('activeItem', -1);
      }
      return true;
    });
  },

  itemsObserver: observer('items', function() {
    this.set('activeItem', -1);
    this.set('receivedResults', true);
  }),

  selectedObserver: observer('selected', 'selected.isLoading', 'selected.isFulfilled', function() {
    this.get('updateDisplayValue').perform();
  }),

  showResultsObserver: observer('showResults', function() {
    next(() => {
      if (this.get('showResults')) {
        this.addWindowClickListener();
      } else {
        this.removeWindowClickListener();
      }
    });
  }),

  updateDisplayValue: task(function*() {
    const selected = yield this.get('selected');
    this.set('searchString', get(selected || {}, this.get('displayLabel')));
  }).on('init').restartable(),

  canPerformSearch: computed('minCharacters', 'searchString', function() {
    return this.get('searchString.length') >= this.get('minCharacters');
  }),

  showResults: and('focused', 'canPerformSearch', 'notLoading', 'receivedResults'),

  searchTimeout: 300,

  throttleQuery: task(function*(searchString) {
    yield timeout(this.get('searchTimeout'));
    this.query(searchString);
    this.set('focused', true);
  }).restartable(),

  moveUp: on(keyDown('ArrowUp'), function(evt) {
    const activeItem = this.get('activeItem');
    if (this.get('showResults')) {
      evt.preventDefault();
      evt.stopPropagation();
      if (activeItem !== 0) {
        this.decrementProperty('activeItem');
      }
    }
  }),

  moveDown: on(keyDown('ArrowDown'), function(evt) {
    const activeItem = this.get('activeItem');
    if (this.get('showResults')) {
      evt.preventDefault();
      evt.stopPropagation();
      if (activeItem < this.get('items.length') - 1) {
        this.incrementProperty('activeItem');
      }
    }
  }),

  enter: on(keyDown('Enter'), function(evt) {
    this.send('select', evt);
  }),

  actions: {
    inputClicked() {
      this.set('focused', true);
    },
    query(searchString) {
      this.set('receivedResults', false);
      this.get('throttleQuery').perform(searchString);
    },
    select(evt, item) {
      if (!this.get('showResults')) {
        return true;
      }
      if (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        item = this.get('items').toArray()[this.get('activeItem')];
      }
      this.select(item);
      this.set('selected', item);
      this.set('focused', false);
      next(() => {
        this.$('input').focus();
      });
    },
  },
});
