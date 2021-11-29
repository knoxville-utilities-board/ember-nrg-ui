## Module Report

### Unknown Global

**Global**: `Ember.testing`

**Location**: `tests\dummy\app\view-components\nrg-lightbox\controller.js` at line 10

```js
  counterTask: task(function*(counter = 0) {
    this.set('counter', ++counter);
    if (!Ember.testing) {
      yield timeout(1000);
      this.get('counterTask').perform(counter);
```
