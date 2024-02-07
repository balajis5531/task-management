import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class TaskEditRoute extends Route {

    @service store;

    model(params) {
          return this.store.peekRecord('task', params.task_id);
    }
}
