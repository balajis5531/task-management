import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | task-list', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:task-list');
    assert.ok(route);
  });
});
