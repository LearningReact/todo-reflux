import Reflux from 'reflux';
import AppActions from '../actions/AppActions.js';

var TodoStore = Reflux.createStore({
  listenables: [AppActions],

  getInitialState: function () {
    this.state = {
      tasks: [],
      showing: 'ALL',
      loading: false
    };
    return this.state;
  },

  requestData: function () {
    this.state.loading = true;
    this.trigger(this.state);
  },

  loadData: function (tasks) {
    this.state.tasks = tasks;
    this.state.loading = false;
    this.trigger(this.state);
  },

  addTask: function (task) {
    this.state.tasks.push(task);
    this.trigger(this.state);
  },

  toggleTask: function (id) {
    var tasks = this.state.tasks;
    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].id === id) {
        tasks[i].completed = !tasks[i].completed;
      }
    }
    this.trigger(this.state);
  },

  deleteTask: function (id) {
    this.state.tasks = this.state.tasks.filter((task) => {
      return task.id !== id;
    });
    this.trigger(this.state);
  },

  clearCompleted: function () {
    this.state.tasks = this.state.tasks.filter((task) => {
      return !task.completed;
    });
    this.trigger(this.state);
  },

  filterTasks: function (filterType) {
    this.state.showing = filterType;
    this.trigger(this.state);
  }
});

export default TodoStore;
