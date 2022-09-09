import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { formatCurrency } from 'dummy/helpers/format-currency';

module('Integration | Helper | format-currency', function (hooks) {
  setupRenderingTest(hooks);

  test('comma support', function (assert) {
    assert.expect(3);

    let result = formatCurrency([533434.67]);
    assert.strictEqual(result, '$533,434.67');

    result = formatCurrency(['53343334.0']);
    assert.strictEqual(result, '$53,343,334.00');

    result = formatCurrency(['$533433340.0']);
    assert.strictEqual(result, '$533,433,340.00');
  });

  test('float', function (assert) {
    assert.expect(4);

    let result = formatCurrency([5.67]);
    assert.strictEqual(result, '$5.67');

    result = formatCurrency([5.6]);
    assert.strictEqual(result, '$5.60');

    result = formatCurrency([5.0]);
    assert.strictEqual(result, '$5.00');

    result = formatCurrency([5]);
    assert.strictEqual(result, '$5.00');
  });

  test('string', function (assert) {
    assert.expect(5);

    let result = formatCurrency(['5.67']);
    assert.strictEqual(result, '$5.67');

    result = formatCurrency(['5.6']);
    assert.strictEqual(result, '$5.60');

    result = formatCurrency(['5.0']);
    assert.strictEqual(result, '$5.00');

    result = formatCurrency(['5.']);
    assert.strictEqual(result, '$5.00');

    result = formatCurrency(['5']);
    assert.strictEqual(result, '$5.00');
  });

  test('string w/ dollar sign', function (assert) {
    assert.expect(5);

    let result = formatCurrency(['$5.67']);
    assert.strictEqual(result, '$5.67');

    result = formatCurrency(['$5.6']);
    assert.strictEqual(result, '$5.60');

    result = formatCurrency(['$5.0']);
    assert.strictEqual(result, '$5.00');

    result = formatCurrency(['$5.']);
    assert.strictEqual(result, '$5.00');

    result = formatCurrency(['$5']);
    assert.strictEqual(result, '$5.00');
  });

  test('zero', function (assert) {
    assert.expect(5);

    let result = formatCurrency(['$0']);
    assert.strictEqual(result, '$0.00');

    result = formatCurrency(['$0.00']);
    assert.strictEqual(result, '$0.00');

    result = formatCurrency([0]);
    assert.strictEqual(result, '$0.00');

    result = formatCurrency(['0']);
    assert.strictEqual(result, '$0.00');

    result = formatCurrency([]);
    assert.strictEqual(result, '$0.00');
  });

  test('negative number', function (assert) {
    let result = formatCurrency(['$-1']);
    assert.strictEqual(result, '($1.00)');

    result = formatCurrency(['-1.1']);
    assert.strictEqual(result, '($1.10)');

    result = formatCurrency([-1.1]);
    assert.strictEqual(result, '($1.10)');
  });
});
