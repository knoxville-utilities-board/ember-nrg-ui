import { A } from '@ember/array';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | lightbox', function (hooks) {
  hooks.beforeEach(function () {
    this.items = A([
      {
        thumbnailId: 0,
      },
      {
        thumbnailId: 1,
      },
      {
        thumbnailId: 2,
      },
    ]);
  });
  setupTest(hooks);

  test('arrows disable properly', function (assert) {
    const items = this.items;
    const service = this.owner.lookup('service:lightbox');
    service.set('items', A());

    service.get('items').pushObjects(items);
    service.set('selectedItem', items.get('firstObject'));
    assert.ok(service.get('previousDisabled'));

    service.set('selectedItem', items.objectAt(2));
    assert.ok(service.get('nextDisabled'));
  });

  test('select next and previous works', function (assert) {
    const items = this.items;
    const service = this.owner.lookup('service:lightbox');
    service.get('items').pushObjects(items);
    service.set('selectedItem', items.get('firstObject'));
    service.selectNext();
    service.selectNext();
    assert.strictEqual(service.get('selectedItem.thumbnailId'), 2);

    service.selectPrevious();
    assert.strictEqual(service.get('selectedItem.thumbnailId'), 1);
  });
});
