import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import EmberObject from '@ember/object';

module('Unit | Service | context-menu', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    this.clients = [
      EmberObject.create({
        contextItems: [
          {
            label: 'C',
            priority: 10,
          },
          {
            label: 'A',
          },
        ],
      }),
      EmberObject.create({
        contextItems: [
          {
            label: 'B',
            priority: 11,
          },
        ],
      }),
    ];
  });

  test('it sorts items correctly', function(assert) {
    const service = this.owner.lookup('service:context-menu');

    this.clients.forEach(client => {
      service.addClient(client);
    });

    const computedList = service.get('contextItems').toArray();
    assert.equal(computedList[0].get('label'), 'B');
    assert.equal(computedList[1].get('label'), 'A');
    assert.equal(computedList[2].get('label'), 'C');
  });
});
