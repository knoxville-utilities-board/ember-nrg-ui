import {
  A
} from '@ember/array';
import {
  module,
  test
} from 'qunit';
import {
  setupTest
} from 'ember-qunit';

module('Unit | Service | lightbox', function(hooks) {
  hooks.beforeEach(function() {
    this.allPhotos = A([{
      id: 0,
    }, {
      id: 1,
    }, {
      id: 2,
    }]);
  })
  setupTest(hooks);

  test('arrows disable properly', function(assert) {
    const allPhotos = this.allPhotos;
    const service = this.owner.lookup('service:lightbox');

    service.get('allPhotos').pushObjects(allPhotos);
    service.set('selectedPhoto', allPhotos.get('firstObject'));
    assert.ok(service.get('previousDisabled'));

    service.set('selectedPhoto', allPhotos.objectAt(2));
    assert.ok(service.get('nextDisabled'));
  });

  test('select next and previous works', function(assert) {
    const allPhotos = this.allPhotos;
    const service = this.owner.lookup('service:lightbox');
    service.get('allPhotos').pushObjects(allPhotos);
    service.set('selectedPhoto', allPhotos.get('firstObject'));
    service.selectNext();
    service.selectNext();

    assert.equal(service.get('selectedPhoto.id'), 2);

    service.selectPrevious();
    assert.equal(service.get('selectedPhoto.id'), 1);
  });
});
