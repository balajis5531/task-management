import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { v4 as uuidv4 } from 'uuid';

export default class TaskFormComponent extends Component {
  @service store;
  @service router;

  @tracked title = '';
  @tracked description = '';
  @tracked priority = 'low';
  @tracked status = 'todo'; 
  @tracked isEditing = false;

  @action
  handleStatusChange(event) {
    this.status = event.target.value;
  }
  @action
  handlePrioritychange(event){
    this.priority = event.target.value;
  }
  
  @action
  async addTask(event) {
    event.preventDefault();
  
    if (this.isEditing) {
      const { title, description, status, priority } = this;
      this.task.title = title;
      this.task.description = description;
      this.task.priority = priority;
      this.task.status = status;
    } else {
      this.store.push({
        data: {
          type: 'task',
          id: uuidv4(),
          attributes: {
            title: this.title,
            description: this.description,
            priority: this.priority,
            status: this.status,
          },
        },
      });
    }
  
    this.resetForm();
    this.router.transitionTo('task-list', { queryParams: { priority: 'all' } });
  }
  
  @action
  resetForm() {
    this.title = '';
    this.description = '';
    this.priority = 'low';
    this.status = 'todo';
    this.isEditing = false;
    this.task = null;
  }
}
