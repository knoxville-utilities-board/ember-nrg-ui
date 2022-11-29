import ensurePathExists from 'dummy/utils/ensure-path-exists';
import { module, test } from 'qunit';

module('Unit | Utility | ensure-path-exists', function () {
  test('it works with empty object and non-nested, non-existing value path', function (assert) {
    const object = {};
    const path = 'property';
    const expected = {};

    ensurePathExists(object, path);

    assert.deepEqual(object, expected);
  });

  test('it works with empty object and lightly nested, non-existing value path', function (assert) {
    const object = {};
    const path = 'lightly.nested.property';
    const expected = { lightly: { nested: {} } };

    ensurePathExists(object, path);

    assert.deepEqual(object, expected);
  });

  test('it works with empty object and non-nested, non-existing value path with array', function (assert) {
    const object = [];
    const path = '1.property';
    const expected = [undefined, {}];

    ensurePathExists(object, path);

    assert.deepEqual(object, expected);
  });

  test('it works with empty object and deeply nested,non-existing value path with arrays', function (assert) {
    const object = {};
    const path =
      'array.3.nested.path.with.another.array.2.finalobject.property';
    const expected = {
      array: [
        undefined,
        undefined,
        undefined,
        {
          nested: {
            path: {
              with: {
                another: { array: [undefined, undefined, { finalobject: {} }] },
              },
            },
          },
        },
      ],
    };

    ensurePathExists(object, path);

    assert.deepEqual(object, expected);
  });

  test('it works with non-empty object and lightly nested, non-existing value path', function (assert) {
    const object = { test: {}, object: {} };
    const path = 'lightly.nested.property';
    const expected = { test: {}, object: {}, lightly: { nested: {} } };

    ensurePathExists(object, path);

    assert.deepEqual(object, expected);
  });

  test('it works with non-empty object and non-nested, non-existing value path with array', function (assert) {
    const object = [
      { test: { existing: { props: ['I', 'Exist'] } } },
      { object: { value: {} } },
    ];
    const path = '1.object.value.path.property';
    const expected = [
      { test: { existing: { props: ['I', 'Exist'] } } },
      { object: { value: { path: {} } } },
    ];

    ensurePathExists(object, path);

    assert.deepEqual(object, expected);
  });

  test('it works with non-empty object and deeply nested, non-existing value path with arrays', function (assert) {
    const path = 'this.a.deeply.nested.array.0.path.property';
    const object = {
      this: {
        is: {
          test: ['aa', 'bb', 'cc'],
        },
        array: ['test', 'test', { test: 'test' }],
        a: {
          deeply: {
            nested: {
              array: [
                { testing: { test: 'test' } },
                { testing: 'test' },
                {},
                {},
                {},
              ],
            },
          },
        },
      },
    };
    const expected = {
      this: {
        is: {
          test: ['aa', 'bb', 'cc'],
        },
        array: ['test', 'test', { test: 'test' }],
        a: {
          deeply: {
            nested: {
              array: [
                { path: {}, testing: { test: 'test' } },
                { testing: 'test' },
                {},
                {},
                {},
              ],
            },
          },
        },
      },
    };

    ensurePathExists(object, path);

    assert.deepEqual(object, expected);
  });
  test('it works with non-empty object and existing value path', function (assert) {
    const path = 'testing.test';
    const object = { testing: { test: 'test' } };
    const expected = { testing: { test: 'test' } };

    ensurePathExists(object, path);

    assert.deepEqual(object, expected);
  });

  test('it works with non-empty object and lightly nested, existing value path', function (assert) {
    const path = 'lightly.nested.property';
    const object = { lightly: { nested: {} } };
    const expected = { lightly: { nested: {} } };

    ensurePathExists(object, path);

    assert.deepEqual(object, expected);
  });

  test('it works with non-empty object and non-nested, existing value path with array', function (assert) {
    const path = '1.testing.test';
    const object = [
      { test: { existing: { props: ['I', 'Exist'] } } },
      {
        shouldstillbehere: {},
        object: { value: {} },
        testing: { test: 'test' },
        test: {},
      },
    ];
    const expected = [
      { test: { existing: { props: ['I', 'Exist'] } } },
      {
        shouldstillbehere: {},
        object: { value: {} },
        testing: { test: 'test' },
        test: {},
      },
    ];

    ensurePathExists(object, path);

    assert.deepEqual(object, expected);
  });

  test('it works with non-empty object and deeply nested, existing value path with arrays', function (assert) {
    const path = 'array.3.nested.path.with.another.array.2.object.property';
    const object = {
      array: [
        undefined,
        undefined,
        undefined,
        {
          nested: {
            path: {
              with: {
                another: {
                  array: [
                    undefined,
                    undefined,
                    { object: { property: 'test' } },
                  ],
                },
              },
            },
          },
        },
      ],
    };
    const expected = {
      array: [
        undefined,
        undefined,
        undefined,
        {
          nested: {
            path: {
              with: {
                another: {
                  array: [
                    undefined,
                    undefined,
                    { object: { property: 'test' } },
                  ],
                },
              },
            },
          },
        },
      ],
    };

    ensurePathExists(object, path);

    assert.deepEqual(object, expected);
  });
});
