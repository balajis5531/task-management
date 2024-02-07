import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('task-create');
  this.route('task-list');
  this.route('task-view', { path: 'task-view/:task_id' });
  this.route('task-edit', { path: 'task-edit/:task_id' });
});
