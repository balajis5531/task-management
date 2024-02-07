import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class TaskListRoute extends Route {
    @service store;
    @service router;

    queryParams = {
      status: {
        refreshModel: true
      },
      priority: {
        refreshModel: true
      },
      search: {
        refreshModel: true
      }
    };
  
    model(params) {

      let tasks = this.store.peekAll('task');
      if (params.status && params.status !== 'all') {
        tasks = tasks.filter(task => task.get('status') === params.status);
      }
      if (params.priority && params.priority !== 'all') {
        tasks = tasks.filter(task => task.get('priority') === params.priority);
      }
      
      if (params.search) {
        const searchTerm = params.search.toLowerCase();
        tasks = tasks.filter(task => {
          const title = task.get('title').toLowerCase();
          const description = task.get('description').toLowerCase();
          return title.includes(searchTerm) || description.includes(searchTerm);
        });
      }

      return tasks;
    }

    @action
     refreshModel() {
    this.refresh();
  }
  
    @action
    editTask(task) {
      if (task.id) {
        this.router.transitionTo('task-edit', task.id);
      } else {
        console.error('Task id is undefined');
      }
    }
  
    @action
    deleteTask(task) {
      this.store.unloadRecord(task);
    }
  
    @action
    viewTask(task) {
      this.router.transitionTo('task-view', task.id);
    }
    @action
    async completeTask(task) {
      try {
  
        if (task.get('status') !== 'done') {
          task.set('status', 'done');
        } else {
          console.warn('Task is already complete');
        }
      } catch (error) {
        console.error('Error completing task:', error);
      }
    }
}
